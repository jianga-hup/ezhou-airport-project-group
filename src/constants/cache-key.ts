/** LS存储需要用到的配置 */
class CacheKey {
  static readonly namespace = 'whedgs-'
  static readonly encodingType = `aes`
  static readonly encryptionSecret = `_ovit_`
}

export default CacheKey
