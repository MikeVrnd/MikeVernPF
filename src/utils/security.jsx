export const validateAnimationPath = (path) => {
  if (!path || typeof path !== "string") return false;

  const allowedAnimations = ["animations/Typing.fbx", "/animations/Typing.fbx"];

  if (path.includes("..") || path.includes("/")) return false;

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
    "/textures/TexturesCompressed/Accountant/icon_video_player_1.jpg",
    "/textures/TexturesCompressed/Accountant/icon_video_player_2.jpg",
    "/textures/TexturesCompressed/Accountant/icon_video_player_3.jpg",
    "/textures/TexturesCompressed/Accountant/icon_video_player_4.jpg",
    "/textures/TexturesCompressed/Accountant/StickyNotes7.jpg",
    "/textures/TexturesCompressed/Accountant/bar.jpg",
    "/textures/TexturesCompressed/Accountant/xsign.jpg",
    "/textures/TexturesCompressed/Accountant/minussign.jpg",
    "/textures/TexturesCompressed/Accountant/VideoIcon.jpg",
    "/textures/TexturesCompressed/SoundOff.jpg",
    "/textures/TexturesCompressed/SoundOn.jpg",
    "/textures/TexturesCompressed/Sun.png",
    "/textures/TexturesCompressed/Moon.png",
    "/little_birds_singing_day.mp3",
    "/summer_night_crickets_night.mp3",
    "/fonts/bodoni-mt-bold-italic.ttf",
    "/fonts/frenchscriptmt.ttf",
    "/fonts/Spartacus-KVdLp.ttf",
    "/fonts/DeliusSwashCaps-Regular.ttf",
    "/fonts/Cookie-Regular.ttf",
    "/panel_click.mp3",
    "/tv_off.mp3",
    "/hover.mp3",
    "audios/page-flip-01a.mp3",
    "/Doink.mp3",
    "/textures/TexturesCompressed/Accountant/Desktop.jpg",
    "/textures/TexturesCompressed/Accountant/DesktopSearch.jpg",
    "/textures/TexturesCompressed/Developer/TV_remote_final7.jpg",
    "/textures/TexturesCompressed/Developer/DoorPlate3.jpg",
    "/textures/1.Περιεχόμενα_1.jpg",
    "/textures/2.Περιεχόμενα_2.jpg",
    "/textures/3.ΓειαΕίμαιΟΜιχάλης.jpg",
    "/textures/4.ΛίγαΛόγιαΓιαΜένα.jpg",
    "/textures/5.ΑκαδημαϊκοίΤίτλοι.jpg",
    "/textures/6.ΕπαγγελματικοίΤίτλοι.jpg",
    "/textures/7.ΕργασιακήΕμπειρία_1.jpg",
    "/textures/8.ΕργασιακήΕμπειρία_2.jpg",
    "/textures/9.Εργοδότες.jpg",
    "/textures/10.Projects_1.jpg",
    "/textures/11.Projects_2.jpg",
    "/textures/12.Projects_3.jpg",
    "/textures/13.ΞένεςΓλώσσες.jpg",
    "/textures/14.Hobbies.jpg",
    "/textures/15.ΣτοιχείαΕπικοινωνίας.jpg",
    "/textures/15.ΣτοιχείαΕπικοινωνίας.jpg",
    "/textures/16.Credits.jpg",
    "/textures/book-cover-roughness.jpg",
    "/textures/book-cover.jpg",
    "/textures/book-back.jpg",
  ];
  return allowed.some((allowedPath) => path === allowedPath);
};
export const validateVideoPath = (path) => {
  if (!path || typeof path !== "string") return false;

  const allowedVideos = [
    "/video_ImageViewer_com_540p.mp4",
    "/video_Moonraker_Πάγια-720p.mp4",
    "/VBA.mp4",
    "/video_BlenderChair.mp4",
    "/ReactFinal.mp4",
  ];

  if (path.includes("..") || path.includes("/")) return false;

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
    "/Objects/Final/Shelves.glb",
    "/Objects/Final/Accountant_place_city_without_building_with_mountain_texture_with_signpost_resized_etc1s_draco_dedup_pruned_simplified_final_optimized.glb",
    "/Objects/Final/HouseMerged_final_optimized.glb",
    "/Objects/Final/Ink9.glb",
    "/Objects/Final/AccPlaceHalfBuildingWithoutFramesAndDegrees_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb",
    "/Objects/Final/Tree_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb",
    "/Objects/Final/Cup.glb",
    "/Objects/Final/PortraitMerged.glb",
    "/Objects/Final/Frames_resized_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb",
    "/Objects/Final/DevPlaceMergedFinalWithoutFramesBetterPillowsWithoutPortrait.glb",
    "/Objects/Final/Degrees.glb",
    "/models/NextSongButton.gltf",
    "/Objects/Final/Building_without_tree_without_signpost_resized_etc1s_draco_dedup_pruned_simplified_final_optimized.glb",
    "/Objects/Final/GrassAndSkyUnmergedFinalWithoutDegreesWithoutFloorFinal_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb",
    "/Objects/Final/JustOneBuildinig_opt_resized_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb",
    "/Objects/Final/DoorSign.glb",
    "/Objects/Final/avatar.glb",
    "/Objects/Final/Arithmodeiktes.glb",
    "/Objects/Final/SkyFinalNoRoof_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb",
    "/Objects/Final/PavementFinal6_etc1s_draco_meshopt_dedup_pruned_simplified_final_optimized.glb",
  ];

  let urlObj;
  try {
    urlObj = new URL(inputPath, window.location.origin);
  } catch (e) {
    console.log(e);
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
      path: "/textures/TexturesCompressed/SoundOn.jpg",
      expected: true,
    },
    { path: "/panel_click.mp3", expected: true },
  ];

  const modelTests = [
    {
      path: "/Objects/Final/avatar.glb",
      expected: true,
    },
    {
      path: "/Objects/Final/avatar.glb",
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
