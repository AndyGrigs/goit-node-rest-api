import fs from "fs/promises";
import path from "path";
import User from "../db/models/User.js";

const tempDir = path.resolve("temp");
const publicDir = path.resolve("public");
const avatarsDir = path.join(publicDir, "avatars");

export const updateUserAvatar = async (userId, avatarPath) => {
  const user = await User.findByPk(userId);

  if (!user) {
    return { error: "Not authorized", status: 401 };
  }

  // Перемістити файл з temp в public/avatars
  const fileName = `${userId}_${path.basename(avatarPath)}`;
  const newAvatarPath = path.join(avatarsDir, fileName);

  try {
    await fs.rename(avatarPath, newAvatarPath);
  } catch (error) {
    return { error: "Failed to process avatar", status: 500 };
  }

  // Оновити avatarURL в БД
  const avatarURL = `/avatars/${fileName}`;
  await user.update({ avatarURL });

  return {
    avatarURL,
  };
};
