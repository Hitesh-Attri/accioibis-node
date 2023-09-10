// Assembly Ai documentation

const fs = require("fs");

const API_TOKEN = process.env.ASSEMBLY_AI_API_TOKEN;

async function upload_file(api_token, path) {
  console.log(`Uploading file: ${path}`);

  const data = fs.readFileSync(path);
  const url = "https://api.assemblyai.com/v2/upload";

  try {
    const response = await fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/octet-stream",
        Authorization: api_token,
      },
    });

    if (response.status === 200) {
      const responseData = await response.json();
      return responseData["upload_url"];
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return null;
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    return null;
  }
}

async function transcribeAudio(api_token, audio_url) {
  console.log("Transcribing audio... This might take a moment.");

  const headers = {
    authorization: api_token,
    "content-type": "application/json",
  };

  const response = await fetch("https://api.assemblyai.com/v2/transcript", {
    method: "POST",
    body: JSON.stringify({ audio_url }),
    headers,
  });

  const responseData = await response.json();
  const transcriptId = responseData.id;

  const pollingEndpoint = `https://api.assemblyai.com/v2/transcript/${transcriptId}`;

  while (true) {
    const pollingResponse = await fetch(pollingEndpoint, { headers });
    const transcriptionResult = await pollingResponse.json();

    if (transcriptionResult.status === "completed") {
      return transcriptionResult;
    } else if (transcriptionResult.status === "error") {
      throw new Error(`Transcription failed: ${transcriptionResult.error}`);
    } else {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
}

async function main() {
  console.log("Welcome to AssemblyAI!");

  const path = "./espn-bears.m4a";
  const uploadUrl = await upload_file(API_TOKEN, path);

  if (!uploadUrl) {
    console.error(new Error("Upload failed. Please try again."));
    return;
  }

  const transcript = await transcribeAudio(API_TOKEN, uploadUrl);

  console.log("Transcript:", transcript.text);
}

main();
