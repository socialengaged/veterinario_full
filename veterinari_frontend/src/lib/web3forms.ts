// ── Web3Forms configuration ──
// Access key from web3forms.com — this is a PUBLIC key, safe to store in code.
// To get your key: go to https://web3forms.com, enter seomantis@gmail.com,
// and paste the access key below.

export const WEB3FORMS_ACCESS_KEY = "51a4ef22-811d-44e8-9da8-130ffbc7f5da";

export async function submitToWeb3Forms(data: Record<string, string>): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `Nuova richiesta veterinaria — ${data.animal || "N/A"} — ${data.location || "N/A"}`,
        from_name: "VeterinarioVicino.it",
        ...data,
      }),
    });

    const result = await response.json();
    return {
      success: result.success === true,
      message: result.message || (result.success ? "Inviato" : "Errore nell'invio"),
    };
  } catch (error) {
    console.error("Web3Forms submission error:", error);
    return { success: false, message: "Errore di connessione. Riprova più tardi." };
  }
}
