// SAST red test: deliberately insecure patterns. NEVER MERGE this branch.
const input = window.location.hash.slice(1);
eval(input);
document.getElementById("out").innerHTML = input;