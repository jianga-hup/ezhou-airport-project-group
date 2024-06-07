/**
 * @description 密码加密
 * @fileName passWord.ts
 * @author
 * @date 2024/01/26 11:19:24
 */
import smCrypto from 'sm-crypto'
export const rsaPublicData = (data: string) => {
  const sm2 = smCrypto.sm2
  const cipherMode = 1 // 1 - C1C3C2，0 - C1C2C3，默认为1
  const publicKey =
    '0487d1eb0dcd90e0c296b382ecc28ba744d05878db8fa15f6fdbc59d44bd5d203c2a84712dd20fdb1ee1be0664e350f6c861b41814a0bf283fc56fed78de586270'
  const encryptData = sm2.doEncrypt(data, publicKey, cipherMode) // 加密结果
  // 此处若把加密串给服务端则加上 04+encryptData
  return '04' + encryptData
}
