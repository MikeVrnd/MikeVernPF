export function validateAssetPath(path) {
  if (!path || typeof path !== "string") return false;

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  const allowedOrigins = [
    origin,
    "http://localhost:5173",
    "http://localhost:4173",
  ];

  const allowedPrefixes = [
    "/textures/",
    "/objects/",
    "/videos/",
    "/animations/",
    "/models/",
    "/audios/",
    "/fonts/",
  ];
  const allowedRootFiles = [
    "/panel_click.mp3",
    "/tv_off.mp3",
    "/hover.mp3",
    "/doink.mp3",
    "/vba.mp4",
    "/reactfinal.mp4",
    "/video_imageviewer_com_540p.mp4",
    "/video_blenderchair.mp4",
    "/video_moonraker_πάγια-720p.mp4",
    "/little_birds_singing_day.mp3",
    "/summer_night_crickets_night.mp3",
  ];

  const validExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    "webp",
    ".ktx2",
    ".mp4",
    ".webm",
    ".ogg",
    ".glb",
    ".gltf",
    ".fbx",
    ".mp3",
    ".ttf",
    ".otf",
    ".woff",
    ".woff2",
  ];
  if (path.includes("..")) return false;

  const lowerPath = path.toLowerCase();
  let pathToCheck = path;
  for (const allowedOrigin of allowedOrigins) {
    if (allowedOrigin && path.startsWith(allowedOrigin)) {
      pathToCheck = path.substring(allowedOrigin.length);
      break;
    }
  }
  if (pathToCheck && !pathToCheck.startsWith("/")) {
    pathToCheck = "/" + pathToCheck;
  }

  const lowerPathToCheck = pathToCheck.toLowerCase();
  const hasAllowedPrefix = allowedPrefixes.some((p) =>
    lowerPathToCheck.startsWith(p.toLowerCase())
  );
  const isAllowedRootFile = allowedRootFiles.some(
    (f) => lowerPathToCheck === f.toLowerCase()
  );

  const hasValidExt = validExtensions.some((ext) => lowerPath.endsWith(ext));

  return (hasAllowedPrefix || isAllowedRootFile) && hasValidExt;
}

export function validateModelPath(path) {
  return validateAssetPath(path);
}

export function validateVideoPath(path) {
  return validateAssetPath(path);
}

export function validateAnimationPath(path) {
  return validateAssetPath(path);
}
export function testSecurity() {
  const tests = [
    { path: "/textures/TexturesCompressed/SoundOn.jpg", expected: true },
    { path: "/Objects/Final/avatar.glb", expected: true },
    { path: "/videos/ReactFinal.mp4", expected: true },
    { path: "/panel_click.mp3", expected: true },
    { path: "/fonts/bodoni-mt-bold-italic.ttf", expected: true },
    { path: "https://evil.com/hack.glb", expected: false },
    { path: "../textures/malicious.jpg", expected: false },
  ];

  let allPassed = true;
  console.log("🔒 Running security tests...");

  tests.forEach((t) => {
    const result = validateAssetPath(t.path);
    const status = result === t.expected ? "✅" : "❌";
    console.log(`${status} ${t.path} → ${result} (expected ${t.expected})`);
    if (result !== t.expected) allPassed = false;
  });

  if (allPassed) console.log("\n🎉 ALL SECURITY TESTS PASSED");
  else console.warn("\n⚠️ Some tests failed");
}
if (typeof window !== "undefined") {
  window.validateAssetPath = validateAssetPath;
  window.validateModelPath = validateModelPath;
  window.validateVideoPath = validateVideoPath;
  window.validateAnimationPath = validateAnimationPath;

  if (import.meta.env?.DEV) {
    window.testSecurity = testSecurity;
  }
}
