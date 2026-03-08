const {onCall, HttpsError} = require("firebase-functions/v2/https");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore, FieldValue} = require("firebase-admin/firestore");
initializeApp();
exports.deleteVaultFull = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "You must be logged in.");
  }
  const db = getFirestore();
  const vaultId = request.data.vaultId;
  if (typeof vaultId !== "string" || vaultId.trim().length === 0) {
    throw new HttpsError(
        "invalid-argument",
        "vaultId is required.",
    );
  }
  const vaultPath = `vaults/${vaultId}`;
  const vaultRef = db.doc(vaultPath);
  const vaultSnap = await vaultRef.get();
  if (!vaultSnap.exists) {
    throw new HttpsError("not-found", "Vault not found.");
  }
  const vault = vaultSnap.data();
  if (vault.owner !== request.auth.uid) {
    throw new HttpsError(
        "permission-denied",
        "Only the vault owner can delete this vault.",
    );
  }
  const userIds = Object.keys(vault.joinedUsers || {});
  const writer = db.bulkWriter();
  for (const uid of userIds) {
    const userRef = db.doc(`users/${uid}`);
    writer.update(userRef, {
      [`joinedVaults.${vaultId}`]: FieldValue.delete(),
    });
  }
  await writer.close();
  await db.recursiveDelete(vaultRef);
  return {success: true};
});
