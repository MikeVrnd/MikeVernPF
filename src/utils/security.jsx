// export const validateAnimationPath = (path) => {
//   if (!path || typeof path !== "string") return false;

//   const allowedAnimations = [
//     "/animations/Typing.fbx",
//     "/animations/Typing.fbx",
//   ];

//   if (path.includes("..") || path.includes("/")) return false;

//   const validExtensions = [".fbx", ".glb", ".gltf"];
//   const hasValidExtension = validExtensions.some((ext) =>
//     path.toLowerCase().endsWith(ext)
//   );
//   if (!hasValidExtension) return false;

//   return allowedAnimations.some((allowedPath) => path === allowedPath);
// };
// export const validateAssetPath = (path) => {
//   if (!path || typeof path !== "string") return false;
//   const allowedOrigins = [
//     window.location.origin, // e.g. https://mike-vern-pf.vercel.app
//     "http://localhost:5173", // local dev
//   ];
//   const allowedPrefixes = [
//     "/textures/",
//     "/objects/",
//     "/videos/",
//     "/animations/",
//   ];

//   const isFromAllowedOrigin = allowedOrigins.some((origin) =>
//     path.startsWith(origin)
//   );

//   const isFromAllowedPrefix = allowedPrefixes.some((prefix) =>
//     path.toLowerCase().startsWith(prefix)
//   );

//   return isFromAllowedOrigin || isFromAllowedPrefix;
// };
// export const validateVideoPath = (path) => {
//   if (!path || typeof path !== "string") return false;

//   const allowedVideos = [
//     "/video_ImageViewer_com_540p.mp4",
//     "/video_Moonraker_Πάγια-720p.mp4",
//     "/VBA.mp4",
//     "/video_BlenderChair.mp4",
//     "/ReactFinal.mp4",
//   ];

//   if (path.includes("..") || path.includes("/")) return false;

//   const validExtensions = [".mp4", ".webm", ".ogg"];
//   const hasValidExtension = validExtensions.some((ext) =>
//     path.toLowerCase().endsWith(ext)
//   );
//   if (!hasValidExtension) return false;

//   return allowedVideos.some((allowedPath) => path === allowedPath);
// };

// export const validateModelPath = (inputPath) => {
//   if (!inputPath || typeof inputPath !== "string") return false;

//   const allowedModels = [
//     "/Objects/Final/Shelves.glb",
//     "/Objects/Final/Accountant_place_city_without_building_with_mountain_texture_with_signpost_resized_etc1s_draco_dedup_pruned_simplified_final_optimized.glb",
//     "/Objects/Final/HouseMerged_final_optimized.glb",
//     "/Objects/Final/Ink9.glb",
//     "/Objects/Final/AccPlaceHalfBuildingWithoutFramesAndDegrees_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb",
//     "/Objects/Final/Tree_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb",
//     "/Objects/Final/Cup.glb",
//     "/Objects/Final/PortraitMerged.glb",
//     "/Objects/Final/Frames_resized_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb",
//     "/Objects/Final/DevPlaceMergedFinalWithoutFramesBetterPillowsWithoutPortrait.glb",
//     "/Objects/Final/Degrees.glb",
//     "/models/NextSongButton.gltf",
//     "/Objects/Final/Building_without_tree_without_signpost_resized_etc1s_draco_dedup_pruned_simplified_final_optimized.glb",
//     "/Objects/Final/GrassAndSkyUnmergedFinalWithoutDegreesWithoutFloorFinal_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb",
//     "/Objects/Final/JustOneBuildinig_opt_resized_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb",
//     "/Objects/Final/DoorSign.glb",
//     "/Objects/Final/avatar.glb",
//     "/Objects/Final/Arithmodeiktes.glb",
//     "/Objects/Final/SkyFinalNoRoof_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb",
//     "/Objects/Final/PavementFinal6_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb",
//   ];

//   let urlObj;
//   try {
//     urlObj = new URL(inputPath, window.location.origin);
//   } catch (e) {
//     console.log(e);
//     return false;
//   }

//   if (urlObj.origin !== window.location.origin) return false;

//   if (urlObj.pathname.includes("..")) return false;

//   const validExtensions = [".glb", ".gltf", ".fbx"];
//   const hasValidExtension = validExtensions.some((ext) =>
//     urlObj.pathname.toLowerCase().endsWith(ext)
//   );
//   if (!hasValidExtension) return false;

//   return allowedModels.includes(urlObj.pathname);
// };

// export const testSecurity = () => {
//   const tests = [
//     {
//       path: "/textures/TexturesCompressed/SoundOn.jpg",
//       expected: true,
//     },
//     { path: "/panel_click.mp3", expected: true },
//   ];

//   const modelTests = [
//     {
//       path: "/Objects/Final/avatar.glb",
//       expected: true,
//     },
//     {
//       path: "/Objects/Final/avatar.glb",
//       expected: true,
//     },
//   ];

//   let allPassed = true;

//   console.log("🔒 Testing Asset Paths:");
//   tests.forEach((test) => {
//     const result = validateAssetPath(test.path);
//     console.log(`   ${test.path} → ${result} (expected: ${test.expected})`);
//     if (result !== test.expected) {
//       console.warn("❌ SECURITY FAILURE!");
//       allPassed = false;
//     }
//   });

//   console.log("\n🔒 Testing 3D Model Paths:");
//   modelTests.forEach((test) => {
//     const result = validateModelPath(test.path);
//     console.log(`   ${test.path} → ${result} (expected: ${test.expected})`);
//     if (result !== test.expected) {
//       console.warn("❌ SECURITY FAILURE!");
//       allPassed = false;
//     }
//   });

//   if (allPassed) {
//     console.log("\n🎉 ALL SECURITY TESTS PASSED!");
//   } else {
//     console.warn("\n⚠️ Some security tests failed!");
//   }
// };

// if (process.env.NODE_ENV === "development") {
//   window.testSecurity = testSecurity;
//   window.validateAssetPath = validateAssetPath;
//   window.validateModelPath = validateModelPath;
// }

// if (typeof window !== "undefined") {
//   window.validateModelPath = validateModelPath;
// }

// 3ος
// export const validateAssetPath = (path) => {
//   if (!path || typeof path !== "string") return false;

//   const allowedOrigins = [window.location.origin, "http://localhost:4173"];

//   const allowedPrefixes = [
//     "/textures/",
//     "/objects/",
//     "/videos/",
//     "/animations/",
//     "/models/",
//     "/audios/",
//   ];

//   const validExtensions = [
//     ".jpg",
//     ".jpeg",
//     ".png",
//     ".ktx2",
//     ".mp4",
//     ".webm",
//     ".ogg",
//     ".glb",
//     ".gltf",
//     ".fbx",
//     ".mp3",
//   ];

//   const lowerPath = path.toLowerCase();
//   const fromAllowedOrigin =
//     allowedOrigins.some((origin) => path.startsWith(origin)) ||
//     path.startsWith("/");

//   // const hasAllowedPrefix = allowedPrefixes.some((p) => lowerPath.startsWith(p));
//   const hasAllowedPrefix =
//     allowedPrefixes.some((p) => lowerPath.startsWith(p)) ||
//     allowedPrefixes.some((p) => path.startsWith(window.location.origin + p));

//   const hasValidExt = validExtensions.some((ext) => lowerPath.endsWith(ext));

//   // Block attempts to go up directories
//   if (path.includes("..")) return false;

//   return fromAllowedOrigin && hasAllowedPrefix && hasValidExt;
// };

// // Optional separate wrappers (for readability)
// export const validateModelPath = (path) => validateAssetPath(path);
// export const validateVideoPath = (path) => validateAssetPath(path);
// export const validateAnimationPath = (path) => validateAssetPath(path);

// export const testSecurity = () => {
//   const tests = [
//     { path: "/textures/TexturesCompressed/SoundOn.jpg", expected: true },
//     { path: "/Objects/Final/avatar.glb", expected: true },
//     { path: "/videos/ReactFinal.mp4", expected: true },
//     { path: "https://evil.com/hack.glb", expected: false },
//     { path: "../textures/malicious.jpg", expected: false },
//   ];

//   let allPassed = true;
//   console.log("🔒 Running security tests...");

//   tests.forEach((t) => {
//     const result = validateAssetPath(t.path);
//     console.log(` ${t.path} → ${result} (expected ${t.expected})`);
//     if (result !== t.expected) allPassed = false;
//   });

//   if (allPassed) console.log("🎉 ALL SECURITY TESTS PASSED");
//   else console.warn("⚠️ Some tests failed");
// };

// if (process.env.NODE_ENV === "development") {
//   window.testSecurity = testSecurity;
//   window.validateAssetPath = validateAssetPath;
//   window.validateModelPath = validateModelPath;
//   window.validateVideoPath = validateVideoPath;
//   window.validateAnimationPath = validateAnimationPath;
// }

// if (typeof window !== "undefined") {
//   window.validateAssetPath = validateAssetPath;
//   window.validateModelPath = validateModelPath;
//   window.validateVideoPath = validateVideoPath;
//   window.validateAnimationPath = validateAnimationPath;
// }
// 4ος σωστός πλην accountant
// export function validateAssetPath(path) {
//   if (!path || typeof path !== "string") return false;

//   // Safe window access
//   const origin = typeof window !== "undefined" ? window.location.origin : "";

//   const allowedOrigins = [
//     origin,
//     "http://localhost:5173",
//     "http://localhost:4173", // Vite preview
//   ];

//   const allowedPrefixes = [
//     "/textures/",
//     "/objects/",
//     "/videos/",
//     "/animations/",
//     "/models/",
//     "/audios/",
//     "/fonts/",
//     "/panel_click.mp3",
//     "/tv_off.mp3",
//   ];

//   const validExtensions = [
//     ".jpg",
//     ".jpeg",
//     ".png",
//     ".ktx2",
//     ".mp4",
//     ".webm",
//     ".ogg",
//     ".glb",
//     ".gltf",
//     ".fbx",
//     ".mp3",
//     ".ttf",
//     ".otf",
//     ".woff",
//     ".woff2",
//   ];

//   // Block directory traversal
//   if (path.includes("..")) return false;

//   const lowerPath = path.toLowerCase();

//   // If path includes origin, strip it for prefix checking
//   let pathToCheck = path;
//   for (const allowedOrigin of allowedOrigins) {
//     if (allowedOrigin && path.startsWith(allowedOrigin)) {
//       pathToCheck = path.substring(allowedOrigin.length);
//       break;
//     }
//   }

//   const lowerPathToCheck = pathToCheck.toLowerCase();

//   // Check if stripped path has allowed prefix
//   const hasAllowedPrefix = allowedPrefixes.some((p) =>
//     lowerPathToCheck.startsWith(p.toLowerCase())
//   );

//   // Check extension
//   const hasValidExt = validExtensions.some((ext) => lowerPath.endsWith(ext));

//   return hasAllowedPrefix && hasValidExt;
// }

// // Wrapper functions - explicitly export as separate functions
// export function validateModelPath(path) {
//   return validateAssetPath(path);
// }

// export function validateVideoPath(path) {
//   return validateAssetPath(path);
// }

// export function validateAnimationPath(path) {
//   return validateAssetPath(path);
// }

// // Test function
// export function testSecurity() {
//   const tests = [
//     { path: "/textures/TexturesCompressed/SoundOn.jpg", expected: true },
//     { path: "/Objects/Final/avatar.glb", expected: true },
//     { path: "/videos/ReactFinal.mp4", expected: true },
//     { path: "/panel_click.mp3", expected: true },
//     { path: "/fonts/bodoni-mt-bold-italic.ttf", expected: true },
//     { path: "https://evil.com/hack.glb", expected: false },
//     { path: "../textures/malicious.jpg", expected: false },
//   ];

//   let allPassed = true;
//   console.log("🔒 Running security tests...");

//   tests.forEach((t) => {
//     const result = validateAssetPath(t.path);
//     const status = result === t.expected ? "✅" : "❌";
//     console.log(`${status} ${t.path} → ${result} (expected ${t.expected})`);
//     if (result !== t.expected) allPassed = false;
//   });

//   if (allPassed) console.log("\n🎉 ALL SECURITY TESTS PASSED");
//   else console.warn("\n⚠️ Some tests failed");
// }

// // Make available globally for debugging
// if (typeof window !== "undefined") {
//   window.validateAssetPath = validateAssetPath;
//   window.validateModelPath = validateModelPath;
//   window.validateVideoPath = validateVideoPath;
//   window.validateAnimationPath = validateAnimationPath;

//   if (import.meta.env?.DEV) {
//     window.testSecurity = testSecurity;
//   }
// }
// 5ος δουλεύει
// Core validation function - always exported first
// export function validateAssetPath(path) {
//   if (!path || typeof path !== "string") return false;

//   // Safe window access
//   const origin = typeof window !== "undefined" ? window.location.origin : "";

//   const allowedOrigins = [
//     origin,
//     "http://localhost:5173",
//     "http://localhost:4173", // Vite preview
//   ];

//   const allowedPrefixes = [
//     "/textures/",
//     "/objects/",
//     "/videos/",
//     "/animations/",
//     "/models/",
//     "/audios/",
//     "/fonts/",
//   ];

//   // Specific allowed files in root
//   const allowedRootFiles = [
//     "/panel_click.mp3",
//     "/tv_off.mp3",
//     "/vba.mp4",
//     "/reactfinal.mp4",
//     "/video_imageviewer_com_540p.mp4",
//     "/video_blenderchair.mp4",
//     "/video_moonraker_πάγια-720p.mp4",
//   ];

//   const validExtensions = [
//     ".jpg",
//     ".jpeg",
//     ".png",
//     ".ktx2",
//     ".mp4",
//     ".webm",
//     ".ogg",
//     ".glb",
//     ".gltf",
//     ".fbx",
//     ".mp3",
//     ".ttf",
//     ".otf",
//     ".woff",
//     ".woff2",
//   ];

//   // Block directory traversal
//   if (path.includes("..")) return false;

//   const lowerPath = path.toLowerCase();

//   // If path includes origin, strip it for prefix checking
//   let pathToCheck = path;
//   for (const allowedOrigin of allowedOrigins) {
//     if (allowedOrigin && path.startsWith(allowedOrigin)) {
//       pathToCheck = path.substring(allowedOrigin.length);
//       break;
//     }
//   }

//   const lowerPathToCheck = pathToCheck.toLowerCase();

//   // Check if stripped path has allowed prefix
//   const hasAllowedPrefix = allowedPrefixes.some((p) =>
//     lowerPathToCheck.startsWith(p.toLowerCase())
//   );

//   // Check if it's an allowed root file
//   const isAllowedRootFile = allowedRootFiles.some(
//     (f) => lowerPathToCheck === f.toLowerCase()
//   );

//   // Check extension
//   const hasValidExt = validExtensions.some((ext) => lowerPath.endsWith(ext));

//   return (hasAllowedPrefix || isAllowedRootFile) && hasValidExt;
// }

// // Wrapper functions - explicitly export as separate functions
// export function validateModelPath(path) {
//   return validateAssetPath(path);
// }

// export function validateVideoPath(path) {
//   return validateAssetPath(path);
// }

// export function validateAnimationPath(path) {
//   return validateAssetPath(path);
// }

// // Test function
// export function testSecurity() {
//   const tests = [
//     { path: "/textures/TexturesCompressed/SoundOn.jpg", expected: true },
//     { path: "/Objects/Final/avatar.glb", expected: true },
//     { path: "/videos/ReactFinal.mp4", expected: true },
//     { path: "/panel_click.mp3", expected: true },
//     { path: "/fonts/bodoni-mt-bold-italic.ttf", expected: true },
//     { path: "https://evil.com/hack.glb", expected: false },
//     { path: "../textures/malicious.jpg", expected: false },
//   ];

//   let allPassed = true;
//   console.log("🔒 Running security tests...");

//   tests.forEach((t) => {
//     const result = validateAssetPath(t.path);
//     const status = result === t.expected ? "✅" : "❌";
//     console.log(`${status} ${t.path} → ${result} (expected ${t.expected})`);
//     if (result !== t.expected) allPassed = false;
//   });

//   if (allPassed) console.log("\n🎉 ALL SECURITY TESTS PASSED");
//   else console.warn("\n⚠️ Some tests failed");
// }

// // Make available globally for debugging
// if (typeof window !== "undefined") {
//   window.validateAssetPath = validateAssetPath;
//   window.validateModelPath = validateModelPath;
//   window.validateVideoPath = validateVideoPath;
//   window.validateAnimationPath = validateAnimationPath;

//   if (import.meta.env?.DEV) {
//     window.testSecurity = testSecurity;
//   }
// }
// 6ος - τελικός
// Core validation function - always exported first
export function validateAssetPath(path) {
  if (!path || typeof path !== "string") return false;

  // Safe window access
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  const allowedOrigins = [
    origin,
    "http://localhost:5173",
    "http://localhost:4173", // Vite preview
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

  // Specific allowed files in root
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

  // Block directory traversal
  if (path.includes("..")) return false;

  const lowerPath = path.toLowerCase();

  // If path includes origin, strip it for prefix checking
  let pathToCheck = path;
  for (const allowedOrigin of allowedOrigins) {
    if (allowedOrigin && path.startsWith(allowedOrigin)) {
      pathToCheck = path.substring(allowedOrigin.length);
      break;
    }
  }

  // Ensure path starts with / for consistent checking
  if (pathToCheck && !pathToCheck.startsWith("/")) {
    pathToCheck = "/" + pathToCheck;
  }

  const lowerPathToCheck = pathToCheck.toLowerCase();

  // Check if stripped path has allowed prefix
  const hasAllowedPrefix = allowedPrefixes.some((p) =>
    lowerPathToCheck.startsWith(p.toLowerCase())
  );

  // Check if it's an allowed root file
  const isAllowedRootFile = allowedRootFiles.some(
    (f) => lowerPathToCheck === f.toLowerCase()
  );

  // Check extension
  const hasValidExt = validExtensions.some((ext) => lowerPath.endsWith(ext));

  return (hasAllowedPrefix || isAllowedRootFile) && hasValidExt;
}

// Wrapper functions - explicitly export as separate functions
export function validateModelPath(path) {
  return validateAssetPath(path);
}

export function validateVideoPath(path) {
  return validateAssetPath(path);
}

export function validateAnimationPath(path) {
  return validateAssetPath(path);
}

// Test function
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

// Make available globally for debugging
if (typeof window !== "undefined") {
  window.validateAssetPath = validateAssetPath;
  window.validateModelPath = validateModelPath;
  window.validateVideoPath = validateVideoPath;
  window.validateAnimationPath = validateAnimationPath;

  if (import.meta.env?.DEV) {
    window.testSecurity = testSecurity;
  }
}
