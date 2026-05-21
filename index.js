/**
 * Injects HTML into a target element and ensures any <script> 
 * tags inside that HTML are actually executed.
 */
function injectHtmlWithScripts(targetSelector, htmlString) {
    const target = document.querySelector(targetSelector);
    if (!target) return;

    // 1. Insert the basic HTML content
    target.innerHTML = htmlString;

    // 2. Find all <script> tags within the injected content
    const scripts = target.querySelectorAll("script");

    scripts.forEach((oldScript) => {
        // Create a fresh script element to "reactivate" it
        const newScript = document.createElement("script");

        // Copy all attributes (like src, type, etc.) from the old script
        Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
        });

        // Copy the inline code if it's not an external script
        if (oldScript.innerHTML) {
            newScript.innerHTML = oldScript.innerHTML;
        }

        // 3. Replace the dead script with the new, executable one
        oldScript.parentNode.replaceChild(newScript, oldScript);
    });
}

// Example Usage:
const myHtml = `
    <div>
        <h2>Loaded Content</h2>
        <script>
            console.log("Script executed inside injected HTML!");
            alert("It works!");
        </script>
    </div>
`;

injectHtmlWithScripts("#content-area", myHtml);
