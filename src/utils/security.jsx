export const validateAnimationPath = (path) => {
  if (!path || typeof path !== "string") return false;

  const allowedAnimations = [
    "animations/Typing.fbx",
    "https://mike-vern-pf.vercel.app/animations/Typing.fbx",
  ];

  if (path.includes("..") || path.includes("https://mike-vern-pf.vercel.app/"))
    return false;

  const validExtensions = [".fbx", ".glb", ".gltf"];
  const hasValidExtension = validExtensions.some((ext) =>
    path.toLowerCase().endsWith(ext)
  );
  if (!hasValidExtension) return false;

  return allowedAnimations.some((allowedPath) => path === allowedPath);
};
export const validateAssetPath = (path) => {
  if (!path || typeof path !== "string") return false;

  const allowed = [
    "https://mike-vern-pf.vercel.app/textures/TexturesCompressed/Accountant/icon_video_player_1.jpg",
    "https://mike-vern-pf.vercel.app/textures/TexturesCompressed/Accountant/icon_video_player_2.jpg",
    "https://mike-vern-pf.vercel.app/textures/TexturesCompressed/Accountant/icon_video_player_3.jpg",
    "https://mike-vern-pf.vercel.app/textures/TexturesCompressed/Accountant/icon_video_player_4.jpg",
    "https://mike-vern-pf.vercel.app/textures/TexturesCompressed/Accountant/StickyNotes7.jpg",
    "https://mike-vern-pf.vercel.app/textures/TexturesCompressed/Accountant/bar.jpg",
    "https://mike-vern-pf.vercel.app/textures/TexturesCompressed/Accountant/xsign.jpg",
    "https://mike-vern-pf.vercel.app/textures/TexturesCompressed/Accountant/minussign.jpg",
    "https://mike-vern-pf.vercel.app/textures/TexturesCompressed/Accountant/VideoIcon.jpg",
    "https://mike-vern-pf.vercel.app/textures/TexturesCompressed/SoundOff.jpg",
    "https://mike-vern-pf.vercel.app/textures/TexturesCompressed/SoundOn.jpg",
    "https://mike-vern-pf.vercel.app/textures/TexturesCompressed/Sun.png",
    "https://mike-vern-pf.vercel.app/textures/TexturesCompressed/Moon.png",
    "https://mike-vern-pf.vercel.app/little_birds_singing_day.mp3",
    "https://mike-vern-pf.vercel.app/summer_night_crickets_night.mp3",
    "https://mike-vern-pf.vercel.app/fonts/bodoni-mt-bold-italic.ttf",
    "https://mike-vern-pf.vercel.app/fonts/frenchscriptmt.ttf",
    "https://mike-vern-pf.vercel.app/fonts/Spartacus-KVdLp.ttf",
    "https://mike-vern-pf.vercel.app/fonts/DeliusSwashCaps-Regular.ttf",
    "https://mike-vern-pf.vercel.app/fonts/Cookie-Regular.ttf",
    "https://mike-vern-pf.vercel.app/panel_click.mp3",
    "https://mike-vern-pf.vercel.app/tv_off.mp3",
    "https://mike-vern-pf.vercel.app/hover.mp3",
    "audios/page-flip-01a.mp3",
    "https://mike-vern-pf.vercel.app/Doink.mp3",
    "https://mike-vern-pf.vercel.app/textures/TexturesCompressed/Accountant/Desktop.jpg",
    "https://mike-vern-pf.vercel.app/textures/TexturesCompressed/Accountant/DesktopSearch.jpg",
    "https://mike-vern-pf.vercel.app/textures/TexturesCompressed/Developer/TV_remote_final7.jpg",
    "https://mike-vern-pf.vercel.app/textures/TexturesCompressed/Developer/DoorPlate3.jpg",
    "https://mike-vern-pf.vercel.app/textures/1.Περιεχόμενα_1.jpg",
    "https://mike-vern-pf.vercel.app/textures/2.Περιεχόμενα_2.jpg",
    "https://mike-vern-pf.vercel.app/textures/3.ΓειαΕίμαιΟΜιχάλης.jpg",
    "https://mike-vern-pf.vercel.app/textures/4.ΛίγαΛόγιαΓιαΜένα.jpg",
    "https://mike-vern-pf.vercel.app/textures/5.ΑκαδημαϊκοίΤίτλοι.jpg",
    "https://mike-vern-pf.vercel.app/textures/6.ΕπαγγελματικοίΤίτλοι.jpg",
    "https://mike-vern-pf.vercel.app/textures/7.ΕργασιακήΕμπειρία_1.jpg",
    "https://mike-vern-pf.vercel.app/textures/8.ΕργασιακήΕμπειρία_2.jpg",
    "https://mike-vern-pf.vercel.app/textures/9.Εργοδότες.jpg",
    "https://mike-vern-pf.vercel.app/textures/10.Projects_1.jpg",
    "https://mike-vern-pf.vercel.app/textures/11.Projects_2.jpg",
    "https://mike-vern-pf.vercel.app/textures/12.Projects_3.jpg",
    "https://mike-vern-pf.vercel.app/textures/13.ΞένεςΓλώσσες.jpg",
    "https://mike-vern-pf.vercel.app/textures/14.Hobbies.jpg",
    "https://mike-vern-pf.vercel.app/textures/15.ΣτοιχείαΕπικοινωνίας.jpg",
    "https://mike-vern-pf.vercel.app/textures/15.ΣτοιχείαΕπικοινωνίας.jpg",
    "https://mike-vern-pf.vercel.app/textures/16.Credits.jpg",
    "https://mike-vern-pf.vercel.app/textures/book-cover-roughness.jpg",
    "https://mike-vern-pf.vercel.app/textures/book-cover.jpg",
    "https://mike-vern-pf.vercel.app/textures/book-back.jpg",
  ];
  return allowed.some((allowedPath) => path === allowedPath);
};
export const validateVideoPath = (path) => {
  if (!path || typeof path !== "string") return false;

  const allowedVideos = [
    "https://mike-vern-pf.vercel.app/video_ImageViewer_com_540p.mp4",
    "https://mike-vern-pf.vercel.app/video_Moonraker_Πάγια-720p.mp4",
    "https://mike-vern-pf.vercel.app/VBA.mp4",
    "https://mike-vern-pf.vercel.app/video_BlenderChair.mp4",
    "https://mike-vern-pf.vercel.app/ReactFinal.mp4",
  ];

  if (path.includes("..") || path.includes("https://mike-vern-pf.vercel.app/"))
    return false;

  const validExtensions = [".mp4", ".webm", ".ogg"];
  const hasValidExtension = validExtensions.some((ext) =>
    path.toLowerCase().endsWith(ext)
  );
  if (!hasValidExtension) return false;

  return allowedVideos.some((allowedPath) => path === allowedPath);
};

export const validateModelPath = (inputPath) => {
  if (!inputPath || typeof inputPath !== "string") return false;

  const allowedModels = [
    "https://mike-vern-pf.vercel.app/Objects/Final/Shelves.glb",
    "https://mike-vern-pf.vercel.app/Objects/Final/Accountant_place_city_without_building_with_mountain_texture_with_signpost_resized_etc1s_draco_dedup_pruned_simplified_final_optimized.glb",
    "https://mike-vern-pf.vercel.app/Objects/Final/HouseMerged_final_optimized.glb",
    "https://mike-vern-pf.vercel.app/Objects/Final/Ink9.glb",
    "https://mike-vern-pf.vercel.app/Objects/Final/AccPlaceHalfBuildingWithoutFramesAndDegrees_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb",
    "https://mike-vern-pf.vercel.app/Objects/Final/Tree_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb",
    "https://mike-vern-pf.vercel.app/Objects/Final/Cup.glb",
    "https://mike-vern-pf.vercel.app/Objects/Final/PortraitMerged.glb",
    "https://mike-vern-pf.vercel.app/Objects/Final/Frames_resized_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb",
    "https://mike-vern-pf.vercel.app/Objects/Final/DevPlaceMergedFinalWithoutFramesBetterPillowsWithoutPortrait.glb",
    "https://mike-vern-pf.vercel.app/Objects/Final/Degrees.glb",
    "https://mike-vern-pf.vercel.app/models/NextSongButton.gltf",
    "https://mike-vern-pf.vercel.app/Objects/Final/Building_without_tree_without_signpost_resized_etc1s_draco_dedup_pruned_simplified_final_optimized.glb",
    "https://mike-vern-pf.vercel.app/Objects/Final/GrassAndSkyUnmergedFinalWithoutDegreesWithoutFloorFinal_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb",
    "https://mike-vern-pf.vercel.app/Objects/Final/JustOneBuildinig_opt_resized_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb",
    "https://mike-vern-pf.vercel.app/Objects/Final/DoorSign.glb",
    "https://mike-vern-pf.vercel.app/Objects/Final/avatar.glb",
    "https://mike-vern-pf.vercel.app/Objects/Final/Arithmodeiktes.glb",
    "https://mike-vern-pf.vercel.app/Objects/Final/SkyFinalNoRoof_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb",
    "https://mike-vern-pf.vercel.app/Objects/Final/PavementFinal6_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb",
  ];

  let urlObj;
  try {
    urlObj = new URL(inputPath, window.location.origin);
  } catch () {

    return false;
  }

  if (urlObj.origin !== window.location.origin) return false;

  if (urlObj.pathname.includes("..")) return false;

  const validExtensions = [".glb", ".gltf", ".fbx"];
  const hasValidExtension = validExtensions.some((ext) =>
    urlObj.pathname.toLowerCase().endsWith(ext)
  );
  if (!hasValidExtension) return false;

  return allowedModels.includes(urlObj.pathname);
};

export const testSecurity = () => {
  const tests = [
    {
      path: "https://mike-vern-pf.vercel.app/textures/TexturesCompressed/SoundOn.jpg",
      expected: true,
    },
    { path: "https://mike-vern-pf.vercel.app/panel_click.mp3", expected: true },
  ];

  const modelTests = [
    {
      path: "https://mike-vern-pf.vercel.app/Objects/Final/avatar.glb",
      expected: true,
    },
    {
      path: "https://mike-vern-pf.vercel.app/Objects/Final/avatar.glb",
      expected: true,
    },
  ];

  let allPassed = true;

  console.log("🔒 Testing Asset Paths:");
  tests.forEach((test) => {
    const result = validateAssetPath(test.path);
    console.log(`   ${test.path} → ${result} (expected: ${test.expected})`);
    if (result !== test.expected) {
      console.warn("❌ SECURITY FAILURE!");
      allPassed = false;
    }
  });

  console.log("\n🔒 Testing 3D Model Paths:");
  modelTests.forEach((test) => {
    const result = validateModelPath(test.path);
    console.log(`   ${test.path} → ${result} (expected: ${test.expected})`);
    if (result !== test.expected) {
      console.warn("❌ SECURITY FAILURE!");
      allPassed = false;
    }
  });

  if (allPassed) {
    console.log("\n🎉 ALL SECURITY TESTS PASSED!");
  } else {
    console.warn("\n⚠️ Some security tests failed!");
  }
};

if (process.env.NODE_ENV === "development") {
  window.testSecurity = testSecurity;
  window.validateAssetPath = validateAssetPath;
  window.validateModelPath = validateModelPath;
}

if (typeof window !== "undefined") {
  window.validateModelPath = validateModelPath;
}
