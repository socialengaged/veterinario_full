from __future__ import annotations

import enum
import uuid
from datetime import datetime
from typing import Any, List, Optional

from sqlalchemy import (
    JSON,
    Boolean,
    Column,
    DateTime,
    Float,
    ForeignKey,
    Index,
    MetaData,
    String,
    Table,
    Text,
    UniqueConstraint,
    func,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class MessageSenderRole(str, enum.Enum):
    user = "user"
    specialist = "specialist"
    system = "system"
    admin = "admin"


specialist_specialties = Table(
    "specialist_specialties",
    Base.metadata,
    Column("specialist_id", UUID(as_uuid=True), ForeignKey("specialists.id", ondelete="CASCADE"), primary_key=True),
    Column("specialty_id", UUID(as_uuid=True), ForeignKey("specialties.id", ondelete="CASCADE"), primary_key=True),
)


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email: Mapped[str] = mapped_column(String(320), unique=True, nullable=False, index=True)
    hashed_password: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    phone: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    email_verified_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False
    )
    profile_notes_for_vets: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    pending_specialist_profile: Mapped[Optional[Any]] = mapped_column(JSON, nullable=True)

    addresses: Mapped[List["UserAddress"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    animals: Mapped[List["Animal"]] = relationship(back_populates="owner", cascade="all, delete-orphan")
    requests: Mapped[List["VetRequest"]] = relationship(back_populates="user")
    conversations: Mapped[List["Conversation"]] = relationship(back_populates="user")
    email_verifications: Mapped[List["EmailVerification"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    specialist_profile: Mapped[Optional["Specialist"]] = relationship(
        "Specialist",
        back_populates="user_account",
        foreign_keys="Specialist.user_id",
        uselist=False,
    )


class UserAddress(Base):
    __tablename__ = "user_addresses"
    __table_args__ = (
        Index("ix_user_addresses_city", "city"),
        Index("ix_user_addresses_province", "province"),
    )

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    city: Mapped[str] = mapped_column(String(128), nullable=False)
    province: Mapped[str] = mapped_column(String(8), nullable=False)
    cap: Mapped[Optional[str]] = mapped_column(String(16), nullable=True)
    street: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)
    label: Mapped[Optional[str]] = mapped_column(String(128), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    user: Mapped["User"] = relationship(back_populates="addresses")
    requests: Mapped[List["VetRequest"]] = relationship(back_populates="address")


class Animal(Base):
    __tablename__ = "animals"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    species: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    owner: Mapped["User"] = relationship(back_populates="animals")
    requests: Mapped[List["VetRequest"]] = relationship(back_populates="animal")


class Specialty(Base):
    __tablename__ = "specialties"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(128), unique=True, nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[str] = mapped_column(String(128), nullable=False, index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    specialists: Mapped[List["Specialist"]] = relationship(secondary=specialist_specialties, back_populates="specialties")
    requests: Mapped[List["VetRequest"]] = relationship(back_populates="specialty")


class Specialist(Base):
    __tablename__ = "specialists"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True
    )
    email: Mapped[str] = mapped_column(String(320), unique=True, nullable=False, index=True)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    city: Mapped[str] = mapped_column(String(128), nullable=False, index=True)
    province: Mapped[str] = mapped_column(String(8), nullable=False, index=True)
    cap: Mapped[Optional[str]] = mapped_column(String(16), nullable=True, index=True)
    street_address: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)
    phone: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    species_tags: Mapped[Any] = mapped_column(JSON, nullable=False, default=list)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    user_account: Mapped[Optional["User"]] = relationship(
        "User", back_populates="specialist_profile", foreign_keys=[user_id]
    )
    specialties: Mapped[List["Specialty"]] = relationship(secondary=specialist_specialties, back_populates="specialists")
    matches: Mapped[List["RequestMatch"]] = relationship(back_populates="specialist")


class VetRequest(Base):
    __tablename__ = "vet_requests"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    animal_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("animals.id", ondelete="CASCADE"), nullable=False)
    address_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("user_addresses.id", ondelete="CASCADE"), nullable=False)
    specialty_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("specialties.id", ondelete="RESTRICT"), nullable=False)
    urgency: Mapped[str] = mapped_column(String(64), nullable=False, default="normale")
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    contact_method: Mapped[str] = mapped_column(String(32), nullable=False, default="telefono")
    marketing_consent: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    sub_service: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    status: Mapped[str] = mapped_column(String(64), nullable=False, default="pending", index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    user: Mapped["User"] = relationship(back_populates="requests")
    animal: Mapped["Animal"] = relationship(back_populates="requests")
    address: Mapped["UserAddress"] = relationship(back_populates="requests")
    specialty: Mapped["Specialty"] = relationship(back_populates="requests")
    matches: Mapped[List["RequestMatch"]] = relationship(back_populates="request", cascade="all, delete-orphan")
    conversation: Mapped[Optional["Conversation"]] = relationship(back_populates="request", uselist=False)


class RequestMatch(Base):
    __tablename__ = "request_matches"
    __table_args__ = (UniqueConstraint("request_id", "specialist_id", name="uq_request_specialist"),)

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    request_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("vet_requests.id", ondelete="CASCADE"), nullable=False, index=True)
    specialist_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("specialists.id", ondelete="CASCADE"), nullable=False)
    score: Mapped[float] = mapped_column(Float, nullable=False)

    request: Mapped["VetRequest"] = relationship(back_populates="matches")
    specialist: Mapped["Specialist"] = relationship(back_populates="matches")


class Conversation(Base):
    __tablename__ = "conversations"
    __table_args__ = (UniqueConstraint("request_id", name="uq_conversation_request"),)

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    request_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("vet_requests.id", ondelete="CASCADE"), nullable=False)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    request: Mapped["VetRequest"] = relationship(back_populates="conversation")
    user: Mapped["User"] = relationship(back_populates="conversations")
    messages: Mapped[List["Message"]] = relationship(back_populates="conversation", cascade="all, delete-orphan")


class Message(Base):
    __tablename__ = "messages"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    conversation_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("conversations.id", ondelete="CASCADE"), nullable=False, index=True)
    sender_role: Mapped[str] = mapped_column(String(32), nullable=False)
    body: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    conversation: Mapped["Conversation"] = relationship(back_populates="messages")


class EmailVerification(Base):
    __tablename__ = "email_verifications"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    token_hash: Mapped[str] = mapped_column(String(128), unique=True, nullable=False, index=True)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    consumed_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    user: Mapped["User"] = relationship(back_populates="email_verifications")


class AdminNotification(Base):
    __tablename__ = "admin_notifications"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    channel: Mapped[str] = mapped_column(String(32), nullable=False, default="whatsapp", index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    payload_json: Mapped[Any] = mapped_column(JSON, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)



