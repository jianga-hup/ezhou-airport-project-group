import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  /** 预设 */
  presets: [
    /** 属性化模式 & 无值的属性模式 */
    presetAttributify(),
    /** 默认预设 */
    presetUno()
  ],
  /** 自定义规则 */
  rules: [
    ['uno-padding-20', { padding: '20px' }],
    [
      'p-c',
      {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%)`
      }
    ],
    ['t-l-c', { left: '50%', transform: `translateX(-50%)` }],
    ['p-e-a', { 'pointer-events': `auto` }],
    [/^wihi-(\d+)$/, ([, d]) => ({ width: `${d}px`, height: `${d}px` })],
    [/^pad-(\d+)$-(\c+)$/, ([, d, c]) => ({ padding: `${d}px ${c}px` })],
    [/^w-c-(\d+)$/, ([, d]) => ({ width: `calc(100% - ${d}px)` })]
  ],
  /** 自定义快捷方式 */
  shortcuts: {
    ell: 'text-truncate',
    'uno-wh-full': 'w-full h-full',
    'uno-flex-center': 'flex justify-center items-center',
    'uno-flex-x-center': 'flex justify-center',
    'uno-flex-y-center': 'flex items-center',
    'uno-flex-baseline': 'flex items-baseline',
    'uno-flex-x-between': 'flex flex-justify-between',
    'uno-flex-between-center': 'flex items-center flex-justify-between',
    'uno-flex-around-center': 'flex items-center flex-justify-around',
    'ell-text': 'text-truncate'
  }
})
