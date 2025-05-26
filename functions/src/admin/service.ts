import * as dbService from './dbservice'

/*
 * ======
 * ADMIN
 * ======
 */

const userLevelImages: Record<string, string[]> = {
  '1': [
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_1%2Fheatmap_1.png?alt=media&token=27d72fd1-30e4-499c-978a-c2a32bcb16ab',
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_1%2Fheatmap_2.png?alt=media&token=66a43c68-5329-44f7-9ce2-5ebcedfcf40c',
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_1%2Fheatmap_3.png?alt=media&token=9937460a-2436-44a5-a820-3a6d8d3b7a8a',
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_1%2Fheatmap_4.png?alt=media&token=1cc93bcd-8a4c-497c-878f-f3232f0e78ff',
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_1%2Fheatmap_5.png?alt=media&token=24204a04-bbe7-4169-aa03-09d9a1348367',
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_1%2Fheatmap_6.png?alt=media&token=862ed068-4c1c-40c3-ab64-5d85cdd0ffbd',
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_1%2Fheatmap_7.png?alt=media&token=10570909-fdad-43eb-b2c0-8422fbfe4958',
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_1%2Fheatmap_8.png?alt=media&token=0d401c1a-6d70-44d7-8194-a054c2c46062',
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_1%2Fheatmap_9.png?alt=media&token=60ade352-7868-4ca2-ab79-a60afcd1367c',
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_1%2Fheatmap_10.png?alt=media&token=59410ee2-86ae-4f05-8076-f116dd6513c6',
  ],
  '2': [
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_2%2Fheatmap_1.png?alt=media&token=11e069e6-5db9-474a-bcfc-d186a4ce992d',
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_2%2Fheatmap_2.png?alt=media&token=5e61199f-0598-488a-b4c4-8660d6e21a57',
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_2%2Fheatmap_3.png?alt=media&token=4f79f650-01e4-4e3e-ae09-590c749dc675',
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_2%2Fheatmap_4.png?alt=media&token=5ed38599-88ca-494e-8782-62eef786ca22',
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_2%2Fheatmap_5.png?alt=media&token=28db2043-d3c2-409a-a4de-1b97c0c88da2',
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_2%2Fheatmap_6.png?alt=media&token=0c2e982b-5dc0-42dc-b6e9-3ba9fa4734bc',
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_2%2Fheatmap_7.png?alt=media&token=da33d4ff-fb1f-4d03-9cbe-7115de176d6e',
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_2%2Fheatmap_8.png?alt=media&token=28a51b99-e303-4f82-a085-0d36e973570c',
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_2%2Fheatmap_9.png?alt=media&token=fa8148f3-0f72-4269-99d7-39c9121fa052',
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_2%2Fheatmap_10.png?alt=media&token=42fb6826-f9f2-443b-84e4-53c048e24763',
  ],
  '3': [
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_3%2Fheatmap_1.png?alt=media&token=99a6390b-1b0d-4939-a6a4-c3911a19e10a',
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_3%2Fheatmap_2.png?alt=media&token=160596b9-1599-429e-adac-4fa0f22408e2',
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_3%2Fheatmap_3.png?alt=media&token=a676019c-74a9-4a90-b5be-d58e3725eb3b',
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_3%2Fheatmap_4.png?alt=media&token=4542ed14-c19f-4117-8212-7ac8c69abe76',
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_3%2Fheatmap_5.png?alt=media&token=9889f6ea-0025-4ac8-9bfa-6ca91ba3cca2',
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_3%2Fheatmap_6.png?alt=media&token=cc53039c-f64a-4eb0-85b7-c099af90711f',
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_3%2Fheatmap_7.png?alt=media&token=0922a5f2-fa1d-4897-817f-4d0a9da68423',
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_3%2Fheatmap_8.png?alt=media&token=86e5ef57-a1fa-41c6-9566-333ad0307eb4',
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_3%2Fheatmap_9.png?alt=media&token=9cc22fc5-7c9e-4329-878a-898a5da7d0f0',
    'https://firebasestorage.googleapis.com/v0/b/cardmatch-e7f12.appspot.com/o/heatmaps%2Flevel_3%2Fheatmap_10.png?alt=media&token=bf7cbff9-d7ee-4d26-9728-ea20fdb4e042',
  ],
}

export const getUserLevel = async () => {
  const result = await dbService.getUserLevel()
  
  return {
    user_level: result.user_level
  }
}

export const getUserStats = async (user_level: string) => {
  const currentEntropy = +(Math.random() * (4 - 1.5) + 1.5).toFixed(2);

  const result = await dbService.getUserStats();
  // If entropy_stats has more than 15 values, keep only the last 15
  if (Array.isArray(result.entropy_stats) && result.entropy_stats.length > 15) {
    result.entropy_stats = result.entropy_stats.slice(-15);
  }

  const images = userLevelImages[user_level] || [];
  const heat_map_image = images.length > 0 ? images[Math.floor(Math.random() * images.length)] : '';
  await dbService.updateUserStats(currentEntropy);

  return {
    entropy_stats: result.entropy_stats,
    user_level,
    current_entropy: currentEntropy,
    heat_map_image,
  }
}