export async function fetchConfig() {
    const response = await fetch("/config.json"); // Wait for the fetch to complete
    const config = await response.json(); // Wait for JSON parsing
    return config.backendAPI;
}
