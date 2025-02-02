var CreateModuleRE2 = (() => {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined
  if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename
  return function (CreateModuleRE2 = {}) {
    var Module = typeof CreateModuleRE2 != 'undefined' ? CreateModuleRE2 : {}
    var readyPromiseResolve, readyPromiseReject
    Module['ready'] = new Promise(function (resolve, reject) {
      readyPromiseResolve = resolve
      readyPromiseReject = reject
    })
    var moduleOverrides = Object.assign({}, Module)
    var arguments_ = []
    var thisProgram = './this.program'
    var quit_ = (status, toThrow) => {
      throw toThrow
    }
    var ENVIRONMENT_IS_WEB = typeof window == 'object'
    var ENVIRONMENT_IS_WORKER = typeof importScripts == 'function'
    var ENVIRONMENT_IS_NODE =
      typeof process == 'object' && typeof process.versions == 'object' && typeof process.versions.node == 'string'
    var scriptDirectory = ''
    function locateFile(path) {
      if (Module['locateFile']) {
        return Module['locateFile'](path, scriptDirectory)
      }
      return scriptDirectory + path
    }
    var read_, readAsync, readBinary, setWindowTitle
    function logExceptionOnExit(e) {
      if (e instanceof ExitStatus) return
      let toLog = e
      err('exiting due to exception: ' + toLog)
    }
    if (ENVIRONMENT_IS_NODE) {
      var fs = require('fs')
      var nodePath = require('path')
      if (ENVIRONMENT_IS_WORKER) {
        scriptDirectory = nodePath.dirname(scriptDirectory) + '/'
      } else {
        scriptDirectory = __dirname + '/'
      }
      read_ = (filename, binary) => {
        filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename)
        return fs.readFileSync(filename, binary ? undefined : 'utf8')
      }
      readBinary = (filename) => {
        var ret = read_(filename, true)
        if (!ret.buffer) {
          ret = new Uint8Array(ret)
        }
        return ret
      }
      readAsync = (filename, onload, onerror) => {
        filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename)
        fs.readFile(filename, function (err, data) {
          if (err) onerror(err)
          else onload(data.buffer)
        })
      }
      if (process['argv'].length > 1) {
        thisProgram = process['argv'][1].replace(/\\/g, '/')
      }
      arguments_ = process['argv'].slice(2)
      process['on']('uncaughtException', function (ex) {
        if (!(ex instanceof ExitStatus)) {
          throw ex
        }
      })
      var nodeMajor = process.version.match(/^v(\d+)\./)[1]
      if (nodeMajor < 15) {
        process['on']('unhandledRejection', function (reason) {
          throw reason
        })
      }
      quit_ = (status, toThrow) => {
        if (keepRuntimeAlive()) {
          process['exitCode'] = status
          throw toThrow
        }
        logExceptionOnExit(toThrow)
        process['exit'](status)
      }
      Module['inspect'] = function () {
        return '[Emscripten Module object]'
      }
    } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
      if (ENVIRONMENT_IS_WORKER) {
        scriptDirectory = self.location.href
      } else if (typeof document != 'undefined' && document.currentScript) {
        scriptDirectory = document.currentScript.src
      }
      if (_scriptDir) {
        scriptDirectory = _scriptDir
      }
      if (typeof g_re_em_force_engine_dir != 'undefined') {
        scriptDirectory = g_re_em_force_engine_dir
      }
      if (scriptDirectory.indexOf('blob:') !== 0) {
        scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, '').lastIndexOf('/') + 1)
      } else {
        scriptDirectory = ''
      }
      Module['m_re_em_assets_bins'] = []
      Module['m_re_em_assets_files'] = {}
      Module['m_re_em_assets_bin_total'] = 0
      Module['m_re_em_assets_bin_loaded'] = 0
      Module['m_re_em_fetch_assets_bin'] = function (slot, filename) {
        var fullfilepath = locateFile(filename)
        var xhr = new XMLHttpRequest()
        xhr.open('GET', fullfilepath, true)
        xhr.responseType = 'arraybuffer'
        xhr.onprogress = function (event) {}
        xhr.onerror = function (event) {
          throw new Error('assets bin error for: ' + fullfilepath)
        }
        xhr.onload = function (event) {
          if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) {
            Module['m_re_em_assets_bins'][slot] = xhr.response
            Module['m_re_em_assets_bin_loaded'] += 1
          } else {
            throw new Error(xhr.statusText + ' : ' + xhr.responseURL)
          }
        }
        xhr.send(null)
      }
      Module['m_re_em_set_assets_files'] = function (files) {
        Module['m_re_em_assets_files'] = files
      }
      Module['m_re_em_assets_bin_total'] = 2
      Module['m_re_em_fetch_assets_bin'](0, 'assets.bin')
      Module['m_re_em_fetch_assets_bin'](1, 'assets1.bin')
      Module['m_re_em_set_assets_files']({
        'appfiles/fonts/simsun.ttc': [0, 0, 5114734],
        'pics/scatter_d1.0.dds': [1, 0, 2979264],
        'pics/universe01.dds': [1, 2979264, 5162523],
        'pics/trans_d1.0.dds': [0, 5114734, 6486399],
        'gis/proj/proj_db.bin': [1, 5162523, 6253614],
        'pics/cube01.dds': [1, 6253614, 7034115],
        'shaders.bin': [0, 6486399, 6581018],
        'appfiles/pics/watermark.png': [0, 6581018, 6611528],
        'appfiles/pics_dark/watermark.png': [0, 6611528, 6642038],
        'appfiles/terrain_pics/epsg3857_pics/[1,2,2].dds': [0, 6642038, 6667424],
        'appfiles/terrain_pics/wgs84_pics/[1,2,1].dds': [0, 6667424, 6689959],
        'appfiles/terrain_pics/epsg3857_pics/[0,1,1].dds': [0, 6689959, 6709379],
        'appfiles/terrain_pics/epsg3857_pics/[1,3,2].dds': [0, 6709379, 6727778],
        'appfiles/terrain_pics/epsg3857_pics/[0,0,1].dds': [0, 6727778, 6744028],
        'appfiles/terrain_pics/wgs84_pics/[1,3,1].dds': [0, 6744028, 6760102],
        'appfiles/terrain_pics/wgs84_pics/[0,1,0].dds': [0, 6760102, 6775828],
        'appfiles/terrain_pics/epsg3857_pics/[1,1,2].dds': [0, 6775828, 6790838],
        'appfiles/terrain_pics/wgs84_pics/[1,1,1].dds': [0, 6790838, 6805553],
        'appfiles/terrain_pics/epsg3857_pics/[1,1,3].dds': [0, 6805553, 6819932],
        'appfiles/terrain_pics/epsg3857_pics/[1,2,3].dds': [0, 6819932, 6834047],
        'appfiles/terrain_pics/epsg3857_pics/[1,0,2].dds': [0, 6834047, 6848139],
        'appfiles/terrain_pics/wgs84_pics/[1,0,1].dds': [0, 6848139, 6860959],
        'appfiles/terrain_pics/epsg3857_pics/[1,3,3].dds': [0, 6860959, 6873152],
        'appfiles/terrain_pics/epsg3857_pics/[0,0,0].dds': [0, 6873152, 6884653],
        'appfiles/terrain_pics/wgs84_pics/[0,0,0].dds': [0, 6884653, 6896123],
        'appfiles/pics/logo01.png': [0, 6896123, 6906933],
        'appfiles/terrain_pics/epsg3857_pics/[1,0,3].dds': [0, 6906933, 6917728],
        'appfiles/terrain_pics/epsg3857_pics/[1,3,1].dds': [0, 6917728, 6927719],
        'appfiles/terrain_pics/epsg3857_pics/[1,1,1].dds': [0, 6927719, 6937193],
        'appfiles/terrain_pics/wgs84_pics/[1,1,0].dds': [0, 6937193, 6946611],
        'appfiles/terrain_pics/wgs84_pics/[1,3,0].dds': [0, 6946611, 6955964],
        'appfiles/terrain_pics/epsg3857_pics/[1,1,0].dds': [0, 6955964, 6964999],
        'appfiles/terrain_pics/epsg3857_pics/[0,1,0].dds': [0, 6964999, 6973402],
        'appfiles/terrain_pics/wgs84_pics/[1,2,0].dds': [0, 6973402, 6981360],
        'appfiles/terrain_pics/epsg3857_pics/[1,3,0].dds': [0, 6981360, 6988054],
        'appfiles/terrain_pics/epsg3857_pics/[1,2,1].dds': [0, 6988054, 6994007],
        'appfiles/skypics/oasisday_front.jpg.dds': [0, 6994007, 6999957],
        'appfiles/skypics/oasisday_right.jpg.dds': [0, 6999957, 7005907],
        'appfiles/skypics/oasisday_left.jpg.dds': [0, 7005907, 7011857],
        'appfiles/skypics/oasisday_back.jpg.dds': [0, 7011857, 7017807],
        'appfiles/terrain_pics/epsg3857_pics/[1,0,0].dds': [0, 7017807, 7023509],
        'appfiles/misc/vc_circle.png': [0, 7023509, 7028603],
        'appfiles/terrain_pics/epsg3857_pics/[1,2,0].dds': [0, 7028603, 7032518],
        'appfiles/pics/panelframelb.png': [0, 7032518, 7035981],
        'appfiles/pics_dark/showcoord.png': [1, 7034115, 7037470],
        'appfiles/pics/showcoord.png': [0, 7035981, 7039336],
        'appfiles/pics/panelframerb.png': [1, 7037470, 7040746],
        'gis/cc/opreconstruction.py': [0, 7039336, 7042363],
        'appfiles/pics/panelframert.png': [1, 7040746, 7043431],
        'appfiles/pics/panelframelt.png': [0, 7042363, 7045037],
        'appfiles/skypics/oasisday_bottom.jpg.dds': [1, 7043431, 7045954],
        'appfiles/misc/selpos.png': [0, 7045037, 7047354],
        'appfiles/terrain_pics/wgs84_pics/[1,0,0].dds': [1, 7045954, 7047978],
        'appfiles/skypics/oasisday_top.jpg.dds': [0, 7047354, 7049360],
        'appfiles/misc/ico_pen.png': [1, 7047978, 7049841],
        'appfiles/pics/panelframer.png': [0, 7049360, 7051214],
        'appfiles/pics/panelframel.png': [1, 7049841, 7051570],
        'appfiles/webui/dark/reset_nor.png': [0, 7051214, 7052876],
        'appfiles/webui/light/reset_nor.png': [1, 7051570, 7053220],
        'appfiles/misc/fence_pot.png': [0, 7052876, 7054460],
        'appfiles/pics/panelframemid.png': [1, 7053220, 7054804],
        'appfiles/pics/hidecoord.png': [0, 7054460, 7056032],
        'appfiles/pics_dark/hidecoord.png': [1, 7054804, 7056376],
        'appfiles/misc/box_pot.png': [0, 7056032, 7057602],
        'appfiles/webui/light/positionmeasure_nor.png': [1, 7056376, 7057853],
        'appfiles/misc/ico_cutter.png': [0, 7057602, 7059032],
        'appfiles/webui/dark/rotate.png': [1, 7057853, 7059257],
        'appfiles/webui/light/rotate.png': [0, 7059032, 7060436],
        'appfiles/webui/dark/terralpha_nor.png': [1, 7059257, 7060606],
        'appfiles/webui/dark/settings_nor.png': [0, 7060436, 7061774],
        'appfiles/webui/light/settings_nor.png': [1, 7060606, 7061937],
        'appfiles/webui/light/terralpha_nor.png': [0, 7061774, 7063101],
        'appfiles/pics/panelframeb.png': [1, 7061937, 7063238],
        'gis/cc/keepcameracalibration.cfg': [0, 7063101, 7064402],
        'appfiles/webui/light/cubecut_nor.png': [1, 7063238, 7064535],
        'appfiles/webui/dark/cubecut_nor.png': [0, 7064402, 7065697],
        'appfiles/webui/light/measure_nor.png': [1, 7064535, 7065818],
        'appfiles/webui/dark/measure_nor.png': [0, 7065697, 7066974],
        'appfiles/webui/light/planecut_nor.png': [1, 7065818, 7067092],
        'appfiles/webui/dark/hidesel_nor.png': [0, 7066974, 7068241],
        'appfiles/webui/dark/planecut_nor.png': [1, 7067092, 7068352],
        'appfiles/webui/light/hidesel_nor.png': [0, 7068241, 7069501],
        'appfiles/webui/dark/terralpha_sel.png': [1, 7068352, 7069611],
        'appfiles/pics/panelframet.png': [0, 7069501, 7070752],
        'appfiles/webui/dark/settings_sel.png': [1, 7069611, 7070855],
        'appfiles/webui/dark/measure_sel.png': [0, 7070752, 7071994],
        'appfiles/webui/dark/resetviewset_nor.png': [1, 7070855, 7072063],
        'appfiles/webui/light/resetviewset_nor.png': [0, 7071994, 7073173],
        'appfiles/webui/dark/rotate_hl.png': [1, 7072063, 7073232],
        'appfiles/webui/light/rotate_hl.png': [0, 7073173, 7074342],
        'appfiles/webui/light/terralpha_sel.png': [1, 7073232, 7074387],
        'appfiles/webui/dark/isolate_nor.png': [0, 7074342, 7075489],
        'appfiles/webui/light/isolate_nor.png': [1, 7074387, 7075532],
        'appfiles/webui/dark/focus.png': [0, 7075489, 7076587],
        'appfiles/webui/light/focus.png': [1, 7075532, 7076630],
        'appfiles/webui/light/measure_sel.png': [0, 7076587, 7077678],
        'appfiles/webui/dark/pickplanecut_nor.png': [1, 7076630, 7077715],
        'appfiles/webui/light/pickplanecut_nor.png': [0, 7077678, 7078763],
        'appfiles/webui/light/settings_sel.png': [1, 7077715, 7078795],
        'appfiles/webui/light/clearmea_nor.png': [0, 7078763, 7079840],
        'appfiles/webui/dark/clearmea_nor.png': [1, 7078795, 7079870],
        'appfiles/webui/dark/focus_hl.png': [0, 7079840, 7080885],
        'appfiles/webui/light/focus_hl.png': [1, 7079870, 7080915],
        'appfiles/webui/dark/ctrlpointcenter.png': [0, 7080885, 7081868],
        'appfiles/webui/light/ctrlpointcenter.png': [1, 7080915, 7081898],
        'appfiles/webui/dark/positionmeasure_nor.png': [0, 7081868, 7082813],
        'appfiles/webui/dark/ctrlpointcenter_hl.png': [1, 7081898, 7082838],
        'appfiles/webui/light/ctrlpointcenter_hl.png': [0, 7082813, 7083753],
        'appfiles/misc/box_pot_pan.png': [1, 7082838, 7083758],
        'appfiles/misc/clipface_pot.png': [0, 7083753, 7084672],
        'appfiles/webui/dark/focusboxsel_sel.png': [1, 7083758, 7084658],
        'appfiles/webui/dark/focusboxsel_nor.png': [1, 7084658, 7085534],
        'appfiles/webui/light/measureangle_nor.png': [0, 7084672, 7085544],
        'appfiles/webui/dark/measureangle_nor.png': [1, 7085534, 7086403],
        'appfiles/webui/light/focusboxsel_nor.png': [0, 7085544, 7086410],
        'appfiles/webui/light/focusboxsel_sel.png': [1, 7086403, 7087261],
        'appfiles/webui/dark/translate.png': [0, 7086410, 7087255],
        'appfiles/webui/light/translate.png': [0, 7087255, 7088100],
        'appfiles/misc/vc_home.png': [1, 7087261, 7088090],
        'appfiles/webui/dark/scale_hl.png': [1, 7088090, 7088859],
        'appfiles/webui/light/scale_hl.png': [0, 7088100, 7088869],
        'appfiles/misc/vc_east.png': [1, 7088859, 7089620],
        'appfiles/webui/dark/measurearea_nor.png': [0, 7088869, 7089627],
        'appfiles/webui/light/measurearea_nor.png': [1, 7089620, 7090371],
        'appfiles/webui/dark/scale.png': [0, 7089627, 7090366],
        'appfiles/webui/light/scale.png': [0, 7090366, 7091105],
        'appfiles/misc/vc_arrowdown.png': [1, 7090371, 7091094],
        'appfiles/webui/dark/translate_hl.png': [1, 7091094, 7091808],
        'appfiles/webui/light/translate_hl.png': [0, 7091105, 7091819],
        'appfiles/webui/dark/cutting_nor.png': [1, 7091808, 7092520],
        'appfiles/webui/light/cutting_nor.png': [0, 7091819, 7092515],
        'appfiles/misc/vc_arrowup.png': [0, 7092515, 7093198],
        'appfiles/webui/dark/cutting_sel.png': [1, 7092520, 7093194],
        'appfiles/misc/vc_west.png': [1, 7093194, 7093864],
        'appfiles/webui/light/cutting_sel.png': [0, 7093198, 7093850],
        'appfiles/misc/vc_south.png': [0, 7093850, 7094497],
        'appfiles/defaultsce/total.xml': [1, 7093864, 7094487],
        'appfiles/misc/vc_north.png': [1, 7094487, 7095092],
        'appfiles/misc/vc_ortho.png': [0, 7094497, 7095099],
        'appfiles/misc/vc_left.png': [1, 7095092, 7095693],
        'appfiles/misc/vc_back.png': [0, 7095099, 7095687],
        'appfiles/misc/vc_front.png': [0, 7095687, 7096271],
        'appfiles/misc/vc_right.png': [1, 7095693, 7096258],
        'appfiles/pics/mouseposlistswitch.png': [1, 7096258, 7096808],
        'gis/proj/proj_ini.bin': [0, 7096271, 7096781],
        'appfiles/misc/vc_bottom.png': [0, 7096781, 7097240],
        'appfiles/terrain_pics/epsg3857_pics/[1,0,1].dds': [1, 7096808, 7097232],
        'appfiles/misc/unpick_pot.png': [1, 7097232, 7097652],
        'appfiles/webui/light/measurelength_nor.png': [0, 7097240, 7097654],
        'pics/blend01.dds': [1, 7097652, 7098060],
        'appfiles/webui/dark/measurelength_nor.png': [0, 7097654, 7098059],
        'appfiles/misc/vc_top.png': [0, 7098059, 7098410],
        'appfiles/misc/vc_triangle_right.png': [1, 7098060, 7098380],
        'appfiles/misc/vc_triangle_up.png': [1, 7098380, 7098700],
        'appfiles/misc/pick_pot.png': [0, 7098410, 7098725],
        'appfiles/misc/vc_triangle_down.png': [1, 7098700, 7099013],
        'appfiles/misc/vc_triangle_left.png': [0, 7098725, 7099037],
        'appfiles/misc/catch_point.png': [1, 7099013, 7099241],
        'appfiles/misc/vc_tick.png': [0, 7099037, 7099191],
        'appfiles/terrain_pics/hm_default.dds': [0, 7099191, 7099318],
        'appfiles/terrain_pics/hm_default_nor.dds': [1, 7099241, 7099364],
        'appfiles/terrain_pics/pic_default.dds': [0, 7099318, 7099435],
        'appfiles/appfiles.sig': [1, 7099364, 7099480],
        'appfiles/terrain_pics/pic_zero.dds': [0, 7099435, 7099551],
        'appfiles/misc/vc_line.png': [1, 7099480, 7099583]
      })
      {
        read_ = (url) => {
          var xhr = new XMLHttpRequest()
          xhr.open('GET', url, false)
          xhr.send(null)
          return xhr.responseText
        }
        if (ENVIRONMENT_IS_WORKER) {
          readBinary = (url) => {
            var xhr = new XMLHttpRequest()
            xhr.open('GET', url, false)
            xhr.responseType = 'arraybuffer'
            xhr.send(null)
            return new Uint8Array(xhr.response)
          }
        }
        readAsync = (url, onload, onerror) => {
          var xhr = new XMLHttpRequest()
          xhr.open('GET', url, true)
          xhr.responseType = 'arraybuffer'
          xhr.onload = () => {
            if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) {
              onload(xhr.response)
              return
            }
            onerror()
          }
          xhr.onerror = onerror
          xhr.send(null)
        }
      }
      setWindowTitle = (title) => (document.title = title)
    } else {
    }
    var out = Module['print'] || console.log.bind(console)
    var err = Module['printErr'] || console.warn.bind(console)
    Object.assign(Module, moduleOverrides)
    moduleOverrides = null
    if (Module['arguments']) arguments_ = Module['arguments']
    if (Module['thisProgram']) thisProgram = Module['thisProgram']
    if (Module['quit']) quit_ = Module['quit']
    var wasmBinary
    if (Module['wasmBinary']) wasmBinary = Module['wasmBinary']
    var noExitRuntime = Module['noExitRuntime'] || true
    if (typeof WebAssembly != 'object') {
      abort('no native wasm support detected')
    }
    var wasmMemory
    var ABORT = false
    var EXITSTATUS
    function assert(condition, text) {
      if (!condition) {
        abort(text)
      }
    }
    var UTF8Decoder = typeof TextDecoder != 'undefined' ? new TextDecoder('utf8') : undefined
    function UTF8ArrayToString(heapOrArray, idx, maxBytesToRead) {
      var endIdx = idx + maxBytesToRead
      var endPtr = idx
      while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr))
      }
      var str = ''
      while (idx < endPtr) {
        var u0 = heapOrArray[idx++]
        if (!(u0 & 128)) {
          str += String.fromCharCode(u0)
          continue
        }
        var u1 = heapOrArray[idx++] & 63
        if ((u0 & 224) == 192) {
          str += String.fromCharCode(((u0 & 31) << 6) | u1)
          continue
        }
        var u2 = heapOrArray[idx++] & 63
        if ((u0 & 240) == 224) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2
        } else {
          u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63)
        }
        if (u0 < 65536) {
          str += String.fromCharCode(u0)
        } else {
          var ch = u0 - 65536
          str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023))
        }
      }
      return str
    }
    function UTF8ToString(ptr, maxBytesToRead) {
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : ''
    }
    function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
      if (!(maxBytesToWrite > 0)) return 0
      var startIdx = outIdx
      var endIdx = outIdx + maxBytesToWrite - 1
      for (var i = 0; i < str.length; ++i) {
        var u = str.charCodeAt(i)
        if (u >= 55296 && u <= 57343) {
          var u1 = str.charCodeAt(++i)
          u = (65536 + ((u & 1023) << 10)) | (u1 & 1023)
        }
        if (u <= 127) {
          if (outIdx >= endIdx) break
          heap[outIdx++] = u
        } else if (u <= 2047) {
          if (outIdx + 1 >= endIdx) break
          heap[outIdx++] = 192 | (u >> 6)
          heap[outIdx++] = 128 | (u & 63)
        } else if (u <= 65535) {
          if (outIdx + 2 >= endIdx) break
          heap[outIdx++] = 224 | (u >> 12)
          heap[outIdx++] = 128 | ((u >> 6) & 63)
          heap[outIdx++] = 128 | (u & 63)
        } else {
          if (outIdx + 3 >= endIdx) break
          heap[outIdx++] = 240 | (u >> 18)
          heap[outIdx++] = 128 | ((u >> 12) & 63)
          heap[outIdx++] = 128 | ((u >> 6) & 63)
          heap[outIdx++] = 128 | (u & 63)
        }
      }
      heap[outIdx] = 0
      return outIdx - startIdx
    }
    function stringToUTF8(str, outPtr, maxBytesToWrite) {
      return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite)
    }
    function lengthBytesUTF8(str) {
      var len = 0
      for (var i = 0; i < str.length; ++i) {
        var c = str.charCodeAt(i)
        if (c <= 127) {
          len++
        } else if (c <= 2047) {
          len += 2
        } else if (c >= 55296 && c <= 57343) {
          len += 4
          ++i
        } else {
          len += 3
        }
      }
      return len
    }
    var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64
    function updateMemoryViews() {
      var b = wasmMemory.buffer
      Module['HEAP8'] = HEAP8 = new Int8Array(b)
      Module['HEAP16'] = HEAP16 = new Int16Array(b)
      Module['HEAP32'] = HEAP32 = new Int32Array(b)
      Module['HEAPU8'] = HEAPU8 = new Uint8Array(b)
      Module['HEAPU16'] = HEAPU16 = new Uint16Array(b)
      Module['HEAPU32'] = HEAPU32 = new Uint32Array(b)
      Module['HEAPF32'] = HEAPF32 = new Float32Array(b)
      Module['HEAPF64'] = HEAPF64 = new Float64Array(b)
    }
    var wasmTable
    var __ATPRERUN__ = []
    var __ATINIT__ = []
    var __ATMAIN__ = []
    var __ATEXIT__ = []
    var __ATPOSTRUN__ = []
    var runtimeInitialized = false
    function keepRuntimeAlive() {
      return noExitRuntime
    }
    function preRun() {
      if (Module['preRun']) {
        if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']]
        while (Module['preRun'].length) {
          addOnPreRun(Module['preRun'].shift())
        }
      }
      callRuntimeCallbacks(__ATPRERUN__)
    }
    function initRuntime() {
      runtimeInitialized = true
      if (!Module['noFSInit'] && !FS.init.initialized) FS.init()
      FS.ignorePermissions = false
      TTY.init()
      callRuntimeCallbacks(__ATINIT__)
    }
    function preMain() {
      callRuntimeCallbacks(__ATMAIN__)
    }
    function postRun() {
      if (Module['postRun']) {
        if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']]
        while (Module['postRun'].length) {
          addOnPostRun(Module['postRun'].shift())
        }
      }
      callRuntimeCallbacks(__ATPOSTRUN__)
    }
    function addOnPreRun(cb) {
      __ATPRERUN__.unshift(cb)
    }
    function addOnInit(cb) {
      __ATINIT__.unshift(cb)
    }
    function addOnPostRun(cb) {
      __ATPOSTRUN__.unshift(cb)
    }
    var runDependencies = 0
    var runDependencyWatcher = null
    var dependenciesFulfilled = null
    function getUniqueRunDependency(id) {
      return id
    }
    function addRunDependency(id) {
      runDependencies++
      if (Module['monitorRunDependencies']) {
        Module['monitorRunDependencies'](runDependencies)
      }
    }
    function removeRunDependency(id) {
      runDependencies--
      if (Module['monitorRunDependencies']) {
        Module['monitorRunDependencies'](runDependencies)
      }
      if (runDependencies == 0) {
        if (runDependencyWatcher !== null) {
          clearInterval(runDependencyWatcher)
          runDependencyWatcher = null
        }
        if (dependenciesFulfilled) {
          var callback = dependenciesFulfilled
          dependenciesFulfilled = null
          callback()
        }
      }
    }
    function abort(what) {
      if (Module['onAbort']) {
        Module['onAbort'](what)
      }
      what = 'Aborted(' + what + ')'
      err(what)
      ABORT = true
      EXITSTATUS = 1
      what += '. Build with -sASSERTIONS for more info.'
      var e = new WebAssembly.RuntimeError(what)
      readyPromiseReject(e)
      throw e
    }
    var dataURIPrefix = 'data:application/octet-stream;base64,'
    function isDataURI(filename) {
      return filename.startsWith(dataURIPrefix)
    }
    function isFileURI(filename) {
      return filename.startsWith('file://')
    }
    var wasmBinaryFile
    wasmBinaryFile = 'RealBIMWeb.wasm'
    if (!isDataURI(wasmBinaryFile)) {
      wasmBinaryFile = locateFile(wasmBinaryFile)
    }
    function getBinary(file) {
      try {
        if (file == wasmBinaryFile && wasmBinary) {
          return new Uint8Array(wasmBinary)
        }
        if (readBinary) {
          return readBinary(file)
        }
        throw 'both async and sync fetching of the wasm failed'
      } catch (err) {
        abort(err)
      }
    }
    function getBinaryPromise() {
      if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
        if (typeof fetch == 'function' && !isFileURI(wasmBinaryFile)) {
          return fetch(wasmBinaryFile, { credentials: 'same-origin' })
            .then(function (response) {
              if (!response['ok']) {
                throw "failed to load wasm binary file at '" + wasmBinaryFile + "'"
              }
              return response['arrayBuffer']()
            })
            .catch(function () {
              return getBinary(wasmBinaryFile)
            })
        } else {
          if (readAsync) {
            return new Promise(function (resolve, reject) {
              readAsync(
                wasmBinaryFile,
                function (response) {
                  resolve(new Uint8Array(response))
                },
                reject
              )
            })
          }
        }
      }
      return Promise.resolve().then(function () {
        return getBinary(wasmBinaryFile)
      })
    }
    function createWasm() {
      var info = { a: wasmImports }
      function receiveInstance(instance, module) {
        var exports = instance.exports
        Module['asm'] = exports
        wasmMemory = Module['asm']['gn']
        updateMemoryViews()
        wasmTable = Module['asm']['kn']
        addOnInit(Module['asm']['hn'])
        removeRunDependency('wasm-instantiate')
      }
      addRunDependency('wasm-instantiate')
      function receiveInstantiationResult(result) {
        receiveInstance(result['instance'])
      }
      function instantiateArrayBuffer(receiver) {
        return getBinaryPromise()
          .then(function (binary) {
            return WebAssembly.instantiate(binary, info)
          })
          .then(function (instance) {
            return instance
          })
          .then(receiver, function (reason) {
            err('failed to asynchronously prepare wasm: ' + reason)
            abort(reason)
          })
      }
      function instantiateAsync() {
        if (
          !wasmBinary &&
          typeof WebAssembly.instantiateStreaming == 'function' &&
          !isDataURI(wasmBinaryFile) &&
          !isFileURI(wasmBinaryFile) &&
          !ENVIRONMENT_IS_NODE &&
          typeof fetch == 'function'
        ) {
          return fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(function (response) {
            var result = WebAssembly.instantiateStreaming(response, info)
            return result.then(receiveInstantiationResult, function (reason) {
              err('wasm streaming compile failed: ' + reason)
              err('falling back to ArrayBuffer instantiation')
              return instantiateArrayBuffer(receiveInstantiationResult)
            })
          })
        } else {
          return instantiateArrayBuffer(receiveInstantiationResult)
        }
      }
      if (Module['instantiateWasm']) {
        try {
          var exports = Module['instantiateWasm'](info, receiveInstance)
          return exports
        } catch (e) {
          err('Module.instantiateWasm callback failed with error: ' + e)
          readyPromiseReject(e)
        }
      }
      instantiateAsync().catch(readyPromiseReject)
      return {}
    }
    var tempDouble
    var tempI64
    var ASM_CONSTS = {
      1772532: () => {
        if (navigator.storage && navigator.storage.persist) {
          navigator.storage.persist().then(function (persistent) {
            if (persistent) console.log('navigator.storage.persist succeeded !!!')
            else console.log('navigator.storage.persist failed !!!')
          })
        } else {
          console.log('navigator.storage.persist unsupportted !!!')
        }
      },
      1772847: () => {
        realengine_rendererwebgl2_handlefocusin = function (e) {
          Module.RealBIMWeb.OnFocusIn()
          return false
        }
        Module.canvas.addEventListener('focusin', realengine_rendererwebgl2_handlefocusin, false)
        realengine_rendererwebgl2_handlefocusout = function (e) {
          Module.RealBIMWeb.OnFocusOut()
          return false
        }
        Module.canvas.addEventListener('focusout', realengine_rendererwebgl2_handlefocusout, false)
      },
      1773235: () => {
        if (typeof realengine_rendererwebgl2_handlefocusin != 'undefined') {
          Module.canvas.removeEventListener('focusin', realengine_rendererwebgl2_handlefocusin)
        }
        if (typeof realengine_rendererwebgl2_handlefocusout != 'undefined') {
          Module.canvas.removeEventListener('focusout', realengine_rendererwebgl2_handlefocusout)
        }
      },
      1773552: ($0) => {
        var re_cur_vis_state = 1
        var re_cur_element = Module.canvas
        while (typeof re_cur_element != 'undefined' && re_cur_element != null) {
          if (re_cur_element.style.display == 'none') {
            re_cur_vis_state = 0
            break
          }
          re_cur_element = re_cur_element.parentElement
        }
        if ($0 != re_cur_vis_state) {
          var event = new CustomEvent('RESystemRenderVisible', {
            detail: { canvasid: Module.canvas.id, visible: re_cur_vis_state }
          })
          document.dispatchEvent(event)
        }
        return re_cur_vis_state
      },
      1774020: () => {
        var event = new CustomEvent('RESystemRenderReady', { detail: { canvasid: Module.canvas.id } })
        document.dispatchEvent(event)
      },
      1774146: () => {
        var event = new CustomEvent('RECameraMove', { detail: { canvasid: Module.canvas.id } })
        document.dispatchEvent(event)
      },
      1774265: () => {
        return Module['m_re_em_window_width']
      },
      1774307: () => {
        return Module['m_re_em_window_height']
      },
      1774350: ($0, $1) => {
        var event = new CustomEvent('RESystemSelShpElement', {
          detail: { canvasid: Module.canvas.id, succeed: $0, button: $1 }
        })
        document.dispatchEvent(event)
      },
      1774505: ($0, $1) => {
        var event = new CustomEvent('RESystemSelElement', {
          detail: { canvasid: Module.canvas.id, succeed: $0, button: $1 }
        })
        document.dispatchEvent(event)
      },
      1774657: ($0, $1) => {
        var event = new CustomEvent('REPanSelShpElement', {
          detail: { canvasid: Module.canvas.id, succeed: $0, button: $1 }
        })
        document.dispatchEvent(event)
      },
      1774809: ($0, $1) => {
        var event = new CustomEvent('RESystemSelShpElement', {
          detail: { canvasid: Module.canvas.id, succeed: $0, button: $1 }
        })
        document.dispatchEvent(event)
      },
      1774964: ($0, $1) => {
        var event = new CustomEvent('RESystemSelElement', {
          detail: { canvasid: Module.canvas.id, succeed: $0, button: $1 }
        })
        document.dispatchEvent(event)
      },
      1775116: ($0, $1) => {
        var event = new CustomEvent('REPanSelShpElement', {
          detail: { canvasid: Module.canvas.id, succeed: $0, button: $1 }
        })
        document.dispatchEvent(event)
      },
      1775268: () => {
        var event = new CustomEvent('RESystemMouseMove', { detail: { canvasid: Module.canvas.id } })
        document.dispatchEvent(event)
      },
      1775390: () => {
        var event = new CustomEvent('RESystemMouseHover', { detail: { canvasid: Module.canvas.id } })
        document.dispatchEvent(event)
      },
      1775513: () => {
        return HEAPU8.length
      },
      1775539: () => {
        var event = new CustomEvent('REAddContPipeSuccessEvent', { detail: { canvasid: Module.canvas.id } })
        document.dispatchEvent(event)
      },
      1775669: ($0) => {
        var event = new CustomEvent('REExitEntityEditMode', { detail: { canvasid: Module.canvas.id, succeed: $0 } })
        document.dispatchEvent(event)
      },
      1775809: ($0) => {
        var event = new CustomEvent('RESystemEngineCreated', { detail: { canvasid: Module.canvas.id, succeed: $0 } })
        document.dispatchEvent(event)
      },
      1775952: ($0, $1) => {
        var vBtnName = UTF8ToString($0)
        var event = new CustomEvent('RESystemUIEvent', {
          detail: { canvasid: Module.canvas.id, btnname: vBtnName, btnstate: $1 }
        })
        document.dispatchEvent(event)
      },
      1776140: () => {
        ENV['LANG'] = 'C.UTF-8'
      },
      1776167: () => {
        ENV['LANG'] = 'C.UTF-8'
      },
      1776194: () => {
        return typeof g_re_em_is_in_worker != 'undefined' ? g_re_em_is_in_worker : 0
      },
      1776276: () => {
        ENV['LANG'] = 'C.UTF-8'
      },
      1776303: () => {
        var event = new CustomEvent('RESystemReady', { detail: { canvasid: Module.canvas.id } })
        document.dispatchEvent(event)
      },
      1776423: ($0) => {
        var event = new CustomEvent('REAddEntityFinish', { detail: { canvasid: Module.canvas.id, succeed: $0 } })
        document.dispatchEvent(event)
      },
      1776560: ($0) => {
        var event = new CustomEvent('REExitEntityEditMode', { detail: { canvasid: Module.canvas.id, succeed: $0 } })
        document.dispatchEvent(event)
      },
      1776700: ($0) => {
        var event = new CustomEvent('REAddEntityFinish', { detail: { canvasid: Module.canvas.id, succeed: $0 } })
        document.dispatchEvent(event)
      },
      1776837: ($0) => {
        var event = new CustomEvent('REExitEntityEditMode', { detail: { canvasid: Module.canvas.id, succeed: $0 } })
        document.dispatchEvent(event)
      },
      1776977: ($0) => {
        var event = new CustomEvent('REElevationUpdateFinish', { detail: { canvasid: Module.canvas.id, succeed: $0 } })
        document.dispatchEvent(event)
      },
      1777122: ($0) => {
        var event = new CustomEvent('REAxisGridUpdateFinish', { detail: { canvasid: Module.canvas.id, succeed: $0 } })
        document.dispatchEvent(event)
      },
      1777266: ($0) => {
        var event = new CustomEvent('REDataSetLoadFinish', { detail: { canvasid: Module.canvas.id, succeed: $0 } })
        document.dispatchEvent(event)
      },
      1777405: ($0) => {
        var event = new CustomEvent('REDataSetLoadFinish', { detail: { canvasid: Module.canvas.id, succeed: $0 } })
        document.dispatchEvent(event)
      },
      1777544: ($0, $1, $2, $3, $4, $5, $6, $7, $8) => {
        var event = new CustomEvent('REGolElemBoneDestLoc', {
          detail: {
            canvasid: Module.canvas.id,
            boneid: $0,
            destloc: {
              m_vAutoScale: [HEAPF64[($1 >> 3) + 0], HEAPF64[($1 >> 3) + 1], HEAPF64[($1 >> 3) + 2]],
              m_vLocalScale: [HEAPF64[($2 >> 3) + 0], HEAPF64[($2 >> 3) + 1], HEAPF64[($2 >> 3) + 2]],
              m_vLocalRotate: [HEAPF64[($3 >> 3) + 0], HEAPF64[($3 >> 3) + 1], HEAPF64[($3 >> 3) + 2]],
              m_vCenterVirOrig: [HEAPF64[($4 >> 3) + 0], HEAPF64[($4 >> 3) + 1], HEAPF64[($4 >> 3) + 2]],
              m_vCenterVirScale: [HEAPF64[($5 >> 3) + 0], HEAPF64[($5 >> 3) + 1], HEAPF64[($5 >> 3) + 2]],
              m_vCenterVirRotate: [HEAPF64[($6 >> 3) + 0], HEAPF64[($6 >> 3) + 1], HEAPF64[($6 >> 3) + 2]],
              m_vCenterVirOffset: [HEAPF64[($7 >> 3) + 0], HEAPF64[($7 >> 3) + 1], HEAPF64[($7 >> 3) + 2]]
            },
            procbatch: $8
          }
        })
        document.dispatchEvent(event)
      },
      1778248: ($0, $1, $2, $3, $4, $5, $6, $7, $8) => {
        var event = new CustomEvent('REGolElemBoneDestLoc', {
          detail: {
            canvasid: Module.canvas.id,
            boneid: $0,
            destloc: {
              m_vAutoScale: [HEAPF64[($1 >> 3) + 0], HEAPF64[($1 >> 3) + 1], HEAPF64[($1 >> 3) + 2]],
              m_vLocalScale: [HEAPF64[($2 >> 3) + 0], HEAPF64[($2 >> 3) + 1], HEAPF64[($2 >> 3) + 2]],
              m_vLocalRotate: [HEAPF64[($3 >> 3) + 0], HEAPF64[($3 >> 3) + 1], HEAPF64[($3 >> 3) + 2]],
              m_vCenterVirOrig: [HEAPF64[($4 >> 3) + 0], HEAPF64[($4 >> 3) + 1], HEAPF64[($4 >> 3) + 2]],
              m_vCenterVirScale: [HEAPF64[($5 >> 3) + 0], HEAPF64[($5 >> 3) + 1], HEAPF64[($5 >> 3) + 2]],
              m_vCenterVirRotate: [HEAPF64[($6 >> 3) + 0], HEAPF64[($6 >> 3) + 1], HEAPF64[($6 >> 3) + 2]],
              m_vCenterVirOffset: [HEAPF64[($7 >> 3) + 0], HEAPF64[($7 >> 3) + 1], HEAPF64[($7 >> 3) + 2]]
            },
            procbatch: $8
          }
        })
        document.dispatchEvent(event)
      },
      1778952: ($0) => {
        var event = new CustomEvent('RELocateCam', { detail: { canvasid: Module.canvas.id, succeed: $0 } })
        document.dispatchEvent(event)
      },
      1779083: ($0) => {
        var event = new CustomEvent('RELocateCam', { detail: { canvasid: Module.canvas.id, succeed: $0 } })
        document.dispatchEvent(event)
      },
      1779214: ($0, $1, $2, $3, $4) => {
        var event = new CustomEvent('RECustomProbeFinish', {
          detail: { canvasid: Module.canvas.id, succeed: $0, index: $1, selPos: [$2, $3, $4] }
        })
        document.dispatchEvent(event)
      },
      1779384: ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) => {
        var origelemids = new Uint32Array(HEAPU8.buffer, $1, $2)
        var event = new CustomEvent('REElemSelRegFinish', {
          detail: {
            canvasid: Module.canvas.id,
            progress: $0,
            elemids: origelemids,
            aabb: [
              [$3, $4, $5],
              [$6, $7, $8]
            ],
            userbatch: $9
          }
        })
        document.dispatchEvent(event)
      },
      1779653: ($0, $1) => {
        var event = new CustomEvent('REElemSelRegFinish', {
          detail: {
            canvasid: Module.canvas.id,
            progress: $0,
            elemids: [],
            aabb: [
              [0, 0, 0],
              [0, 0, 0]
            ],
            userbatch: $1
          }
        })
        document.dispatchEvent(event)
      },
      1779850: ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) => {
        var origelemids = new Uint32Array(HEAPU8.buffer, $1, $2)
        var event = new CustomEvent('REElemSelRegFinish', {
          detail: {
            canvasid: Module.canvas.id,
            progress: $0,
            elemids: origelemids,
            aabb: [
              [$3, $4, $5],
              [$6, $7, $8]
            ],
            userbatch: $9
          }
        })
        document.dispatchEvent(event)
      },
      1780119: ($0, $1) => {
        var event = new CustomEvent('REElemSelRegFinish', {
          detail: {
            canvasid: Module.canvas.id,
            progress: $0,
            elemids: [],
            aabb: [
              [0, 0, 0],
              [0, 0, 0]
            ],
            userbatch: $1
          }
        })
        document.dispatchEvent(event)
      },
      1780316: ($0, $1) => {
        var event = new CustomEvent('RealBIMTrainStop', {
          detail: { canvasid: Module.canvas.id, trainid: $0, userid: $1 }
        })
        document.dispatchEvent(event)
      },
      1780462: ($0) => {
        var event = new CustomEvent('RECADLoadFinish', { detail: { canvasid: Module.canvas.id, succeed: $0 } })
        document.dispatchEvent(event)
      },
      1780597: ($0) => {
        var event = new CustomEvent('REDataSetLoadPanFinish', { detail: { canvasid: Module.canvas.id, succeed: $0 } })
        document.dispatchEvent(event)
      },
      1780739: ($0) => {
        var event = new CustomEvent('REPanLoadSingleFinish', { detail: { canvasid: Module.canvas.id, succeed: $0 } })
        document.dispatchEvent(event)
      },
      1780879: ($0) => {
        var event = new CustomEvent('REPanCamAutoForwardFinish', {
          detail: { canvasid: Module.canvas.id, succeed: $0 }
        })
        document.dispatchEvent(event)
      },
      1781024: ($0) => {
        var event = new CustomEvent('RELoadFEMFinish', { detail: { canvasid: Module.canvas.id, succeed: $0 } })
        document.dispatchEvent(event)
      },
      1781158: ($0) => {
        var event = new CustomEvent('REMiniMapLoadCAD', { detail: { canvasid: Module.canvas.id, succeed: $0 } })
        document.dispatchEvent(event)
      },
      1781294: ($0, $1) => {
        var messageStr = UTF8ToString($1)
        var event = new CustomEvent('REGenPipeCenterLineProgress', {
          detail: { canvasid: Module.canvas.id, progress: $0, hugeMBlockNum: $1, message: messageStr }
        })
        document.dispatchEvent(event)
      },
      1781517: ($0) => {
        var event = new CustomEvent('REAddEntityFinish', { detail: { canvasid: Module.canvas.id, succeed: $0 } })
        document.dispatchEvent(event)
      },
      1781654: () => {
        return HEAPU8.length
      },
      1781678: ($0, $1) => {
        var infostr = UTF8ToString($1)
        var event = new CustomEvent('REDataSetLoadProgress', {
          detail: { canvasid: Module.canvas.id, progress: $0, info: infostr }
        })
        document.dispatchEvent(event)
      },
      1781867: () => {
        var event = new CustomEvent('RealEngineSigReady', { detail: { canvasid: Module.canvas.id } })
        document.dispatchEvent(event)
      },
      1781990: ($0, $1, $2, $3) => {
        HEAPU8.set(Module['m_re_em_golarraybuf'][$0].subarray($1, $1 + $3), $2)
      },
      1782065: ($0, $1, $2, $3) => {
        HEAPU8.set(Module['m_re_em_golarraybuf'][$0].subarray($1, $1 + $3), $2)
      },
      1782140: () => {
        var event = new CustomEvent('REEarthworkRgnFinish', { detail: { canvasid: Module.canvas.id } })
        document.dispatchEvent(event)
      },
      1782265: ($0) => {
        var event = new CustomEvent('REPanLoadSingleFinish', { detail: { canvasid: Module.canvas.id, succeed: $0 } })
        document.dispatchEvent(event)
      },
      1782405: ($0) => {
        var event = new CustomEvent('RESystemFrameSel', { detail: { canvasid: Module.canvas.id, succeed: $0 } })
        document.dispatchEvent(event)
      },
      1782543: ($0, $1) => {
        var event = new CustomEvent('MoveOBSectionFinish', {
          detail: { canvasid: Module.canvas.id, sectionID: $0, flatten: $1 }
        })
        document.dispatchEvent(event)
      },
      1782700: () => {
        var event = new CustomEvent('AddWaterRgnSuccessEvent', { detail: { canvasid: Module.canvas.id } })
        document.dispatchEvent(event)
      },
      1782828: () => {
        var event = new CustomEvent('AddWaterRgnFailedEvent', { detail: { canvasid: Module.canvas.id } })
        document.dispatchEvent(event)
      },
      1782957: () => {
        var event = new CustomEvent('DelWaterRgnCnrFailed_LessThan3', { detail: { canvasid: Module.canvas.id } })
        document.dispatchEvent(event)
      },
      1783094: () => {
        var event = new CustomEvent('DelWaterRgnCnrFailed_SelfIntersect', { detail: { canvasid: Module.canvas.id } })
        document.dispatchEvent(event)
      },
      1783235: () => {
        var event = new CustomEvent('DelWaterRgnCnrFailed_LessThan3', { detail: { canvasid: Module.canvas.id } })
        document.dispatchEvent(event)
      },
      1783372: () => {
        var event = new CustomEvent('DelWaterRgnCnrFailed_SelfIntersect', { detail: { canvasid: Module.canvas.id } })
        document.dispatchEvent(event)
      },
      1783513: () => {
        var event = new CustomEvent('DelWaterRgnCnrFailed_LessThan3', { detail: { canvasid: Module.canvas.id } })
        document.dispatchEvent(event)
      },
      1783650: () => {
        var event = new CustomEvent('DelWaterRgnCnrFailed_SelfIntersect', { detail: { canvasid: Module.canvas.id } })
        document.dispatchEvent(event)
      },
      1783791: () => {
        var event = new CustomEvent('AddExtrudeRgnSuccessEvent', { detail: { canvasid: Module.canvas.id } })
        document.dispatchEvent(event)
      },
      1783923: () => {
        var event = new CustomEvent('AddExtrudeRgnFailedEvent', { detail: { canvasid: Module.canvas.id } })
        document.dispatchEvent(event)
      },
      1784054: ($0, $1, $2, $3, $4) => {
        var event = new CustomEvent('REEarthworkCalcProgress', {
          detail: { canvasid: Module.canvas.id, progress: $0, cutvol: $1, cutarea: $2, fillvol: $3, fillarea: $4 }
        })
        document.dispatchEvent(event)
      },
      1784248: () => {
        var event = new CustomEvent('REEditAffineTransWndClose', { detail: { canvasid: Module.canvas.id } })
        document.dispatchEvent(event)
      },
      1784380: () => {
        var event = new CustomEvent('REEditAffineTransWndClose', { detail: { canvasid: Module.canvas.id } })
        document.dispatchEvent(event)
      },
      1784512: ($0, $1) => {
        var event = new CustomEvent('RealBIMEndClipping', {
          detail: { canvasid: Module.canvas.id, succeed: $0, button: $1 }
        })
        document.dispatchEvent(event)
      },
      1784664: ($0, $1, $2, $3) => {
        Module['m_re_em_golarraybuf'][$0].set(HEAPU8.subarray($2, $2 + $3), $1)
      },
      1784739: ($0, $1, $2, $3) => {
        Module['m_re_em_golarraybuf'][$0].set(HEAPU8.subarray($2, $2 + $3), $1)
      },
      1784814: ($0, $1) => {
        var event = new CustomEvent('NewOBSectionFinish', {
          detail: { canvasid: Module.canvas.id, sectionID: $0, flatten: $1 }
        })
        document.dispatchEvent(event)
      },
      1784969: ($0, $1, $2, $3) => {
        var _elemid = UTF8ToString($0)
        var _fileid = UTF8ToString($1)
        var event = new CustomEvent('RECADSelElement', {
          detail: { canvasid: Module.canvas.id, elemid: _elemid, fileid: _fileid, pos: [$2, $3] }
        })
        document.dispatchEvent(event)
      },
      1785208: ($0) => {
        var _elemid = UTF8ToString($0)
        var event = new CustomEvent('RECADSelAnchor', { detail: { canvasid: Module.canvas.id, elemid: _elemid } })
        document.dispatchEvent(event)
      },
      1785380: ($0) => {
        var _elemid = UTF8ToString($0)
        var event = new CustomEvent('RECADSelShpAnchor', { detail: { canvasid: Module.canvas.id, elemid: _elemid } })
        document.dispatchEvent(event)
      },
      1785555: ($0) => {
        var _elemid = UTF8ToString($0)
        var event = new CustomEvent('REMiniMapCADSelShpAnchor', {
          detail: { canvasid: Module.canvas.id, elemid: _elemid }
        })
        document.dispatchEvent(event)
      },
      1785737: ($0, $1) => {
        var measureId = UTF8ToString($1)
        var event = new CustomEvent('RECADMeasurementDrawFinish', {
          detail: { canvasid: Module.canvas.id, style: $0, measureId: measureId }
        })
        document.dispatchEvent(event)
      },
      1785940: () => {
        return navigator['hardwareConcurrency']
      },
      1785983: () => {
        if (typeof Module['m_re_em_force_threadnum'] != 'undefined') {
          return Module['m_re_em_force_threadnum']
        } else {
          return 16
        }
      },
      1786104: () => {
        return Module['m_re_em_assets_bin_loaded'] >= Module['m_re_em_assets_bin_total'] ? 1 : 0
      },
      1786198: ($0, $1, $2, $3) => {
        Module['m_re_em_golarraybuf'][$0].set(HEAPU8.subarray($2, $2 + $3), $1)
      },
      1786273: ($0, $1, $2, $3) => {
        HEAPU8.set(Module['m_re_em_golarraybuf'][$0].subarray($1, $1 + $3), $2)
      },
      1786348: ($0, $1, $2, $3) => {
        HEAPU8.set(Module['m_re_em_golarraybuf'][$0].subarray($1, $1 + $3), $2)
      },
      1786423: ($0, $1, $2, $3) => {
        Module['m_re_em_golarraybuf'][$0].set(HEAPU8.subarray($2, $2 + $3), $1)
      },
      1786498: ($0, $1, $2, $3) => {
        Module['m_re_em_golarraybuf'][$0].set(HEAPU8.subarray($2, $2 + $3), $1)
      },
      1786573: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1786900: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1787264: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1787591: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1787955: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1788282: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1788646: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1788973: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1789337: ($0, $1, $2, $3) => {
        HEAPU8.set(Module['m_re_em_golarraybuf'][$0].subarray($1, $1 + $3), $2)
      },
      1789412: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1789739: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1790103: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1790430: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1790794: ($0, $1, $2, $3) => {
        Module['m_re_em_golarraybuf'][$0].set(HEAPU8.subarray($2, $2 + $3), $1)
      },
      1790869: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1791196: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1791560: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1791887: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1792251: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1792578: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1792942: ($0, $1, $2, $3) => {
        Module['m_re_em_golarraybuf'][$0].set(HEAPU8.subarray($2, $2 + $3), $1)
      },
      1793017: ($0, $1, $2, $3) => {
        Module['m_re_em_golarraybuf'][$0].set(HEAPU8.subarray($2, $2 + $3), $1)
      },
      1793092: ($0, $1, $2, $3) => {
        HEAPU8.set(Module['m_re_em_golarraybuf'][$0].subarray($1, $1 + $3), $2)
      },
      1793167: ($0, $1, $2, $3) => {
        HEAPU8.set(Module['m_re_em_golarraybuf'][$0].subarray($1, $1 + $3), $2)
      },
      1793242: ($0, $1, $2, $3) => {
        HEAPU8.set(Module['m_re_em_golarraybuf'][$0].subarray($1, $1 + $3), $2)
      },
      1793317: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1793644: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1794008: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1794335: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1794699: ($0, $1, $2, $3) => {
        Module['m_re_em_golarraybuf'][$0].set(HEAPU8.subarray($2, $2 + $3), $1)
      },
      1794774: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1795101: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1795465: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1795792: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1796156: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1796483: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1796847: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1797174: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1797538: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1797865: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1798229: ($0, $1, $2, $3) => {
        Module['m_re_em_golarraybuf'][$0].set(HEAPU8.subarray($2, $2 + $3), $1)
      },
      1798304: ($0, $1, $2, $3) => {
        Module['m_re_em_golarraybuf'][$0].set(HEAPU8.subarray($2, $2 + $3), $1)
      },
      1798379: ($0, $1, $2, $3) => {
        Module['m_re_em_golarraybuf'][$0].set(HEAPU8.subarray($2, $2 + $3), $1)
      },
      1798454: ($0, $1, $2, $3) => {
        Module['m_re_em_golarraybuf'][$0].set(HEAPU8.subarray($2, $2 + $3), $1)
      },
      1798529: ($0, $1, $2, $3) => {
        HEAPU8.set(Module['m_re_em_golarraybuf'][$0].subarray($1, $1 + $3), $2)
      },
      1798604: ($0, $1, $2, $3) => {
        HEAPU8.set(Module['m_re_em_golarraybuf'][$0].subarray($1, $1 + $3), $2)
      },
      1798679: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1799006: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1799370: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1799697: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1800061: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1800388: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1800752: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1801079: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1801443: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1801770: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1802134: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1802461: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1802825: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1803152: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1803516: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1803843: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1804207: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1804534: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1804898: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1805225: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1805589: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1805916: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1806280: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1806607: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1806971: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1807298: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1807662: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1807989: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1808353: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1808680: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1809044: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1809371: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1809735: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1810062: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1810426: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1810753: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1811117: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1811444: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1811808: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1812135: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1812499: ($0, $1, $2, $3) => {
        Module['m_re_em_golarraybuf'][$0].set(HEAPU8.subarray($2, $2 + $3), $1)
      },
      1812574: ($0, $1) => {
        var realengine_enginecwd = locateFile('')
        stringToUTF8(realengine_enginecwd, $0, $1)
      },
      1812664: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1813028: ($0) => {
        return Module['m_re_em_golarraybuf'][$0].length
      },
      1813079: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array(
          Module['m_re_em_golarraybuf'][$0]
        )
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1813474: ($0, $1) => {
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = new Uint8Array(Module['m_re_em_golarraybuf'][$1])
      },
      1813604: ($0) => {
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf_freeids'].push($0)
      },
      1813696: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array(
          Module['m_re_em_golarraybuf'][$0]
        )
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1814091: ($0) => {
        if ($0 < Module['m_re_em_golarraybuf'].length) {
          delete Module['m_re_em_golarraybuf'][$0]
          Module['m_re_em_golarraybuf_freeids'].push($0)
        }
      },
      1814230: ($0, $1, $2) => {
        Module['m_re_em_golarraybuf_temp_buf0'] = new Uint8Array($1)
        Module['m_re_em_golarraybuf_temp_buf0'].set(Module['m_re_em_golarraybuf'][$0].subarray(0, $2), 0)
        delete Module['m_re_em_golarraybuf'][$0]
        Module['m_re_em_golarraybuf'][$0] = Module['m_re_em_golarraybuf_temp_buf0']
        Module['m_re_em_golarraybuf_temp_buf0'] = []
      },
      1814557: ($0) => {
        if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
        } else {
          Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
        }
        Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array($0)
        return Module['m_re_em_golarraybuf_temp_id0']
      },
      1814921: ($0, $1, $2, $3) => {
        Module['m_re_em_golarraybuf'][$0].set(HEAPU8.subarray($2, $2 + $3), $1)
      },
      1814996: () => {
        if (typeof workerorigjobidbuf == 'undefined') {
          workerorigjobidbuf = 0
          workerorigjobidbuflen = 0
        }
        if (workerorigjobidbuflen < workertaskbuffer.length + 1) {
          if (workerorigjobidbuf) {
            _free(workerorigjobidbuf)
          }
          workerorigjobidbuflen = workertaskbuffer.length + 1
          workerorigjobidbuf = _malloc(4 * workerorigjobidbuflen)
        }
        var origids = new Int32Array(HEAPU8.buffer, workerorigjobidbuf, workerorigjobidbuflen)
        origids[0] = workertaskbuffer.length
        for (var i = 0; i < workertaskbuffer.length; ++i) {
          origids[i + 1] = workertaskbuffer[i].data['callid']
        }
        return workerorigjobidbuf
      },
      1815559: ($0, $1) => {
        var finaljoblocs = new Uint32Array(HEAPU8.buffer, $0, $1)
        var temptaskbuffer = []
        for (var i = 0; i < finaljoblocs.length; ++i) {
          temptaskbuffer.push(workertaskbuffer[finaljoblocs[i]])
        }
        workertaskbuffer = temptaskbuffer
      },
      1815780: ($0) => {
        var relpath = UTF8ToString($0)
        if (typeof Module['m_re_em_assets_files'][relpath] != 'undefined') {
          var fileinfo = Module['m_re_em_assets_files'][relpath]
          if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
            Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
          } else {
            Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
          }
          Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array(
            new Uint8Array(Module['m_re_em_assets_bins'][fileinfo[0]], fileinfo[1], fileinfo[2] - fileinfo[1])
          )
          return Module['m_re_em_golarraybuf_temp_id0']
        } else {
          return -1
        }
      },
      1816411: ($0) => {
        var relpath = UTF8ToString($0)
        if (typeof Module['m_re_em_assets_files'][relpath] != 'undefined') {
          var fileinfo = Module['m_re_em_assets_files'][relpath]
          if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
            Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
          } else {
            Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
          }
          Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array(
            new Uint8Array(Module['m_re_em_assets_bins'][fileinfo[0]], fileinfo[1], fileinfo[2] - fileinfo[1])
          )
          return Module['m_re_em_golarraybuf_temp_id0']
        } else {
          return -1
        }
      },
      1817042: ($0) => {
        var str = UTF8ToString($0) + '\n\n' + 'Abort/Retry/Ignore/AlwaysIgnore? [ariA] :'
        var reply = window.prompt(str, 'i')
        if (reply === null) {
          reply = 'i'
        }
        return allocate(intArrayFromString(reply), 'i8', ALLOC_NORMAL)
      },
      1817267: () => {
        if (typeof AudioContext !== 'undefined') {
          return 1
        } else if (typeof webkitAudioContext !== 'undefined') {
          return 1
        }
        return 0
      },
      1817404: () => {
        if (
          typeof navigator.mediaDevices !== 'undefined' &&
          typeof navigator.mediaDevices.getUserMedia !== 'undefined'
        ) {
          return 1
        } else if (typeof navigator.webkitGetUserMedia !== 'undefined') {
          return 1
        }
        return 0
      },
      1817628: ($0) => {
        if (typeof Module['SDL2'] === 'undefined') {
          Module['SDL2'] = {}
        }
        var SDL2 = Module['SDL2']
        if (!$0) {
          SDL2.audio = {}
        } else {
          SDL2.capture = {}
        }
        if (!SDL2.audioContext) {
          if (typeof AudioContext !== 'undefined') {
            SDL2.audioContext = new AudioContext()
          } else if (typeof webkitAudioContext !== 'undefined') {
            SDL2.audioContext = new webkitAudioContext()
          }
        }
        return SDL2.audioContext === undefined ? -1 : 0
      },
      1818051: () => {
        var SDL2 = Module['SDL2']
        return SDL2.audioContext.sampleRate
      },
      1818119: ($0, $1, $2, $3) => {
        var SDL2 = Module['SDL2']
        var have_microphone = function (stream) {
          if (SDL2.capture.silenceTimer !== undefined) {
            clearTimeout(SDL2.capture.silenceTimer)
            SDL2.capture.silenceTimer = undefined
          }
          SDL2.capture.mediaStreamNode = SDL2.audioContext.createMediaStreamSource(stream)
          SDL2.capture.scriptProcessorNode = SDL2.audioContext.createScriptProcessor($1, $0, 1)
          SDL2.capture.scriptProcessorNode.onaudioprocess = function (audioProcessingEvent) {
            if (SDL2 === undefined || SDL2.capture === undefined) {
              return
            }
            audioProcessingEvent.outputBuffer.getChannelData(0).fill(0)
            SDL2.capture.currentCaptureBuffer = audioProcessingEvent.inputBuffer
            dynCall('vi', $2, [$3])
          }
          SDL2.capture.mediaStreamNode.connect(SDL2.capture.scriptProcessorNode)
          SDL2.capture.scriptProcessorNode.connect(SDL2.audioContext.destination)
          SDL2.capture.stream = stream
        }
        var no_microphone = function (error) {}
        SDL2.capture.silenceBuffer = SDL2.audioContext.createBuffer($0, $1, SDL2.audioContext.sampleRate)
        SDL2.capture.silenceBuffer.getChannelData(0).fill(0)
        var silence_callback = function () {
          SDL2.capture.currentCaptureBuffer = SDL2.capture.silenceBuffer
          dynCall('vi', $2, [$3])
        }
        SDL2.capture.silenceTimer = setTimeout(silence_callback, ($1 / SDL2.audioContext.sampleRate) * 1e3)
        if (navigator.mediaDevices !== undefined && navigator.mediaDevices.getUserMedia !== undefined) {
          navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(have_microphone).catch(no_microphone)
        } else if (navigator.webkitGetUserMedia !== undefined) {
          navigator.webkitGetUserMedia({ audio: true, video: false }, have_microphone, no_microphone)
        }
      },
      1819771: ($0, $1, $2, $3) => {
        var SDL2 = Module['SDL2']
        SDL2.audio.scriptProcessorNode = SDL2.audioContext['createScriptProcessor']($1, 0, $0)
        SDL2.audio.scriptProcessorNode['onaudioprocess'] = function (e) {
          if (SDL2 === undefined || SDL2.audio === undefined) {
            return
          }
          SDL2.audio.currentOutputBuffer = e['outputBuffer']
          dynCall('vi', $2, [$3])
        }
        SDL2.audio.scriptProcessorNode['connect'](SDL2.audioContext['destination'])
      },
      1820181: ($0, $1) => {
        var SDL2 = Module['SDL2']
        var numChannels = SDL2.capture.currentCaptureBuffer.numberOfChannels
        for (var c = 0; c < numChannels; ++c) {
          var channelData = SDL2.capture.currentCaptureBuffer.getChannelData(c)
          if (channelData.length != $1) {
            throw (
              'Web Audio capture buffer length mismatch! Destination size: ' +
              channelData.length +
              ' samples vs expected ' +
              $1 +
              ' samples!'
            )
          }
          if (numChannels == 1) {
            for (var j = 0; j < $1; ++j) {
              setValue($0 + j * 4, channelData[j], 'float')
            }
          } else {
            for (var j = 0; j < $1; ++j) {
              setValue($0 + (j * numChannels + c) * 4, channelData[j], 'float')
            }
          }
        }
      },
      1820786: ($0, $1) => {
        var SDL2 = Module['SDL2']
        var numChannels = SDL2.audio.currentOutputBuffer['numberOfChannels']
        for (var c = 0; c < numChannels; ++c) {
          var channelData = SDL2.audio.currentOutputBuffer['getChannelData'](c)
          if (channelData.length != $1) {
            throw (
              'Web Audio output buffer length mismatch! Destination size: ' +
              channelData.length +
              ' samples vs expected ' +
              $1 +
              ' samples!'
            )
          }
          for (var j = 0; j < $1; ++j) {
            channelData[j] = HEAPF32[($0 + ((j * numChannels + c) << 2)) >> 2]
          }
        }
      },
      1821266: ($0) => {
        var SDL2 = Module['SDL2']
        if ($0) {
          if (SDL2.capture.silenceTimer !== undefined) {
            clearTimeout(SDL2.capture.silenceTimer)
          }
          if (SDL2.capture.stream !== undefined) {
            var tracks = SDL2.capture.stream.getAudioTracks()
            for (var i = 0; i < tracks.length; i++) {
              SDL2.capture.stream.removeTrack(tracks[i])
            }
            SDL2.capture.stream = undefined
          }
          if (SDL2.capture.scriptProcessorNode !== undefined) {
            SDL2.capture.scriptProcessorNode.onaudioprocess = function (audioProcessingEvent) {}
            SDL2.capture.scriptProcessorNode.disconnect()
            SDL2.capture.scriptProcessorNode = undefined
          }
          if (SDL2.capture.mediaStreamNode !== undefined) {
            SDL2.capture.mediaStreamNode.disconnect()
            SDL2.capture.mediaStreamNode = undefined
          }
          if (SDL2.capture.silenceBuffer !== undefined) {
            SDL2.capture.silenceBuffer = undefined
          }
          SDL2.capture = undefined
        } else {
          if (SDL2.audio.scriptProcessorNode != undefined) {
            SDL2.audio.scriptProcessorNode.disconnect()
            SDL2.audio.scriptProcessorNode = undefined
          }
          SDL2.audio = undefined
        }
        if (SDL2.audioContext !== undefined && SDL2.audio === undefined && SDL2.capture === undefined) {
          SDL2.audioContext.close()
          SDL2.audioContext = undefined
        }
      },
      1822438: ($0, $1, $2) => {
        var w = $0
        var h = $1
        var pixels = $2
        if (!Module['SDL2']) Module['SDL2'] = {}
        var SDL2 = Module['SDL2']
        if (SDL2.ctxCanvas !== Module['canvas']) {
          SDL2.ctx = Module['createContext'](Module['canvas'], false, true)
          SDL2.ctxCanvas = Module['canvas']
        }
        if (SDL2.w !== w || SDL2.h !== h || SDL2.imageCtx !== SDL2.ctx) {
          SDL2.image = SDL2.ctx.createImageData(w, h)
          SDL2.w = w
          SDL2.h = h
          SDL2.imageCtx = SDL2.ctx
        }
        var data = SDL2.image.data
        var src = pixels >> 2
        var dst = 0
        var num
        if (typeof CanvasPixelArray !== 'undefined' && data instanceof CanvasPixelArray) {
          num = data.length
          while (dst < num) {
            var val = HEAP32[src]
            data[dst] = val & 255
            data[dst + 1] = (val >> 8) & 255
            data[dst + 2] = (val >> 16) & 255
            data[dst + 3] = 255
            src++
            dst += 4
          }
        } else {
          if (SDL2.data32Data !== data) {
            SDL2.data32 = new Int32Array(data.buffer)
            SDL2.data8 = new Uint8Array(data.buffer)
          }
          var data32 = SDL2.data32
          num = data32.length
          data32.set(HEAP32.subarray(src, src + num))
          var data8 = SDL2.data8
          var i = 3
          var j = i + 4 * num
          if (num % 8 == 0) {
            while (i < j) {
              data8[i] = 255
              i = (i + 4) | 0
              data8[i] = 255
              i = (i + 4) | 0
              data8[i] = 255
              i = (i + 4) | 0
              data8[i] = 255
              i = (i + 4) | 0
              data8[i] = 255
              i = (i + 4) | 0
              data8[i] = 255
              i = (i + 4) | 0
              data8[i] = 255
              i = (i + 4) | 0
              data8[i] = 255
              i = (i + 4) | 0
            }
          } else {
            while (i < j) {
              data8[i] = 255
              i = (i + 4) | 0
            }
          }
        }
        SDL2.ctx.putImageData(SDL2.image, 0, 0)
        return 0
      },
      1823893: ($0, $1, $2, $3, $4) => {
        var w = $0
        var h = $1
        var hot_x = $2
        var hot_y = $3
        var pixels = $4
        var canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        var ctx = canvas.getContext('2d')
        var image = ctx.createImageData(w, h)
        var data = image.data
        var src = pixels >> 2
        var dst = 0
        var num
        if (typeof CanvasPixelArray !== 'undefined' && data instanceof CanvasPixelArray) {
          num = data.length
          while (dst < num) {
            var val = HEAP32[src]
            data[dst] = val & 255
            data[dst + 1] = (val >> 8) & 255
            data[dst + 2] = (val >> 16) & 255
            data[dst + 3] = (val >> 24) & 255
            src++
            dst += 4
          }
        } else {
          var data32 = new Int32Array(data.buffer)
          num = data32.length
          data32.set(HEAP32.subarray(src, src + num))
        }
        ctx.putImageData(image, 0, 0)
        var url =
          hot_x === 0 && hot_y === 0
            ? 'url(' + canvas.toDataURL() + '), auto'
            : 'url(' + canvas.toDataURL() + ') ' + hot_x + ' ' + hot_y + ', auto'
        var urlBuf = _malloc(url.length + 1)
        stringToUTF8(url, urlBuf, url.length + 1)
        return urlBuf
      },
      1824882: ($0) => {
        if (Module['canvas']) {
          Module['canvas'].style['cursor'] = UTF8ToString($0)
        }
        return 0
      },
      1824975: () => {
        if (Module['canvas']) {
          Module['canvas'].style['cursor'] = 'none'
        }
      },
      1825044: () => {
        return screen.width
      },
      1825069: () => {
        return screen.height
      },
      1825095: () => {
        return window.innerWidth
      },
      1825125: () => {
        return window.innerHeight
      },
      1825156: ($0) => {
        if (typeof setWindowTitle !== 'undefined') {
          setWindowTitle(UTF8ToString($0))
        }
        return 0
      },
      1825251: ($0, $1, $2) => {
        GLctx.bufferData(GLctx.ARRAY_BUFFER, Module['m_re_em_golarraybuf'][$0], GLctx.DYNAMIC_DRAW, $1, $2)
      },
      1825354: ($0, $1, $2, $3) => {
        GLctx.bufferSubData(GLctx.ARRAY_BUFFER, $0, Module['m_re_em_golarraybuf'][$1], $2, $3)
      },
      1825444: ($0, $1, $2) => {
        GLctx.bufferData(GLctx.ELEMENT_ARRAY_BUFFER, Module['m_re_em_golarraybuf'][$0], GLctx.DYNAMIC_DRAW, $1, $2)
      },
      1825555: ($0, $1, $2, $3) => {
        GLctx.bufferSubData(GLctx.ELEMENT_ARRAY_BUFFER, $0, Module['m_re_em_golarraybuf'][$1], $2, $3)
      },
      1825653: ($0, $1, $2) => {
        GLctx.bufferData(GLctx.ARRAY_BUFFER, Module['m_re_em_golarraybuf'][$0], GLctx.DYNAMIC_DRAW, $1, $2)
      },
      1825756: ($0, $1, $2, $3) => {
        GLctx.bufferSubData(GLctx.ARRAY_BUFFER, $0, Module['m_re_em_golarraybuf'][$1], $2, $3)
      },
      1825846: ($0, $1) => {
        if (Module.m_re_em_get_gpu_temp_buf.byteLength < $1) {
          Module.m_re_em_get_gpu_temp_buf = new ArrayBuffer($1)
        }
        var re_em_temp_arr = new Uint8Array(Module.m_re_em_get_gpu_temp_buf, 0, $1)
        Module.ctx.getBufferSubData(Module.ctx.PIXEL_PACK_BUFFER, 0, re_em_temp_arr)
        HEAPU8.set(re_em_temp_arr, $0)
      },
      1826144: ($0, $1) => {
        if (Module.m_re_em_get_gpu_temp_buf.byteLength < $1) {
          Module.m_re_em_get_gpu_temp_buf = new ArrayBuffer($1)
        }
        var re_em_temp_arr = new Uint8Array(Module.m_re_em_get_gpu_temp_buf, 0, $1)
        Module.ctx.getBufferSubData(Module.ctx.PIXEL_PACK_BUFFER, 0, re_em_temp_arr)
        HEAPU8.set(re_em_temp_arr, $0)
      },
      1826442: ($0, $1) => {
        if (Module.m_re_em_get_gpu_temp_buf.byteLength < $1) {
          Module.m_re_em_get_gpu_temp_buf = new ArrayBuffer($1)
        }
        var re_em_temp_arr = new Uint8Array(Module.m_re_em_get_gpu_temp_buf, 0, $1)
        Module.ctx.getBufferSubData(Module.ctx.PIXEL_PACK_BUFFER, 0, re_em_temp_arr)
        HEAPU8.set(re_em_temp_arr, $0)
      },
      1826740: ($0, $1, $2, $3, $4) => {
        Module.ctx.texStorage2D($0, $1, $2, $3, $4)
      },
      1826787: ($0, $1, $2, $3, $4, $5) => {
        Module.ctx.texStorage3D($0, $1, $2, $3, $4, $5)
      },
      1826838: ($0, $1, $2, $3, $4) => {
        Module.ctx.texStorage2D($0, $1, $2, $3, $4)
      },
      1826885: ($0, $1, $2, $3, $4, $5) => {
        Module.ctx.texStorage3D($0, $1, $2, $3, $4, $5)
      },
      1826936: ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) => {
        GLctx.compressedTexSubImage2D($0, $1, $2, $3, $4, $5, $6, Module['m_re_em_golarraybuf'][$7], $8, $9)
      },
      1827042: ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) => {
        if ($8 == 0) {
          GLctx.texSubImage2D($0, $1, $2, $3, $4, $5, $6, $7, Module['m_re_em_golarraybuf'][$9], $10)
        } else if ($8 == 1) {
          GLctx.texSubImage2D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            new Int8Array(Module['m_re_em_golarraybuf'][$9].buffer, $10),
            0
          )
        } else if ($8 == 2) {
          GLctx.texSubImage2D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            new Uint16Array(
              Module['m_re_em_golarraybuf'][$9].buffer,
              $10,
              parseInt((Module['m_re_em_golarraybuf'][$9].byteLength - $10) / 2)
            ),
            0
          )
        } else if ($8 == 3) {
          GLctx.texSubImage2D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            new Int16Array(
              Module['m_re_em_golarraybuf'][$9].buffer,
              $10,
              parseInt((Module['m_re_em_golarraybuf'][$9].byteLength - $10) / 2)
            ),
            0
          )
        } else if ($8 == 4) {
          GLctx.texSubImage2D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            new Uint32Array(
              Module['m_re_em_golarraybuf'][$9].buffer,
              $10,
              parseInt((Module['m_re_em_golarraybuf'][$9].byteLength - $10) / 4)
            ),
            0
          )
        } else if ($8 == 5) {
          GLctx.texSubImage2D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            new Int32Array(
              Module['m_re_em_golarraybuf'][$9].buffer,
              $10,
              parseInt((Module['m_re_em_golarraybuf'][$9].byteLength - $10) / 4)
            ),
            0
          )
        } else {
          GLctx.texSubImage2D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            new Float32Array(
              Module['m_re_em_golarraybuf'][$9].buffer,
              $10,
              parseInt((Module['m_re_em_golarraybuf'][$9].byteLength - $10) / 4)
            ),
            0
          )
        }
      },
      1828285: ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) => {
        GLctx.compressedTexSubImage3D($0, $1, $2, $3, $4, $5, $6, $7, $8, Module['m_re_em_golarraybuf'][$9], $10, $11)
      },
      1828401: ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) => {
        if ($10 == 0) {
          GLctx.texSubImage3D($0, $1, $2, $3, $4, $5, $6, $7, $8, $9, Module['m_re_em_golarraybuf'][$11], $12)
        } else if ($10 == 1) {
          GLctx.texSubImage3D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            new Int8Array(Module['m_re_em_golarraybuf'][$11].buffer, $12),
            0
          )
        } else if ($10 == 2) {
          GLctx.texSubImage3D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            new Uint16Array(
              Module['m_re_em_golarraybuf'][$11].buffer,
              $12,
              parseInt((Module['m_re_em_golarraybuf'][$11].byteLength - $12) / 2)
            ),
            0
          )
        } else if ($10 == 3) {
          GLctx.texSubImage3D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            new Int16Array(
              Module['m_re_em_golarraybuf'][$11].buffer,
              $12,
              parseInt((Module['m_re_em_golarraybuf'][$11].byteLength - $12) / 2)
            ),
            0
          )
        } else if ($10 == 4) {
          GLctx.texSubImage3D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            new Uint32Array(
              Module['m_re_em_golarraybuf'][$11].buffer,
              $12,
              parseInt((Module['m_re_em_golarraybuf'][$11].byteLength - $12) / 4)
            ),
            0
          )
        } else if ($10 == 5) {
          GLctx.texSubImage3D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            new Int32Array(
              Module['m_re_em_golarraybuf'][$11].buffer,
              $12,
              parseInt((Module['m_re_em_golarraybuf'][$11].byteLength - $12) / 4)
            ),
            0
          )
        } else {
          GLctx.texSubImage3D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            new Float32Array(
              Module['m_re_em_golarraybuf'][$11].buffer,
              $12,
              parseInt((Module['m_re_em_golarraybuf'][$11].byteLength - $12) / 4)
            ),
            0
          )
        }
      },
      1829718: ($0, $1, $2, $3, $4) => {
        Module.ctx.texStorage2D($0, $1, $2, $3, $4)
      },
      1829765: ($0, $1, $2, $3, $4, $5) => {
        Module.ctx.texStorage3D($0, $1, $2, $3, $4, $5)
      },
      1829816: ($0, $1, $2, $3, $4, $5, $6, $7) => {
        GLctx.compressedTexImage2D($0, $1, $2, $3, $4, 0, Module['m_re_em_golarraybuf'][$5], $6, $7)
      },
      1829914: ($0, $1, $2, $3, $4) => {
        Module.ctx.texStorage2D($0, $1, $2, $3, $4)
      },
      1829961: ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) => {
        if ($8 == 0) {
          GLctx.texSubImage2D($0, $1, $2, $3, $4, $5, $6, $7, Module['m_re_em_golarraybuf'][$9], $10)
        } else if ($8 == 1) {
          GLctx.texSubImage2D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            new Int8Array(Module['m_re_em_golarraybuf'][$9].buffer, $10),
            0
          )
        } else if ($8 == 2) {
          GLctx.texSubImage2D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            new Uint16Array(
              Module['m_re_em_golarraybuf'][$9].buffer,
              $10,
              parseInt((Module['m_re_em_golarraybuf'][$9].byteLength - $10) / 2)
            ),
            0
          )
        } else if ($8 == 3) {
          GLctx.texSubImage2D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            new Int16Array(
              Module['m_re_em_golarraybuf'][$9].buffer,
              $10,
              parseInt((Module['m_re_em_golarraybuf'][$9].byteLength - $10) / 2)
            ),
            0
          )
        } else if ($8 == 4) {
          GLctx.texSubImage2D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            new Uint32Array(
              Module['m_re_em_golarraybuf'][$9].buffer,
              $10,
              parseInt((Module['m_re_em_golarraybuf'][$9].byteLength - $10) / 4)
            ),
            0
          )
        } else if ($8 == 5) {
          GLctx.texSubImage2D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            new Int32Array(
              Module['m_re_em_golarraybuf'][$9].buffer,
              $10,
              parseInt((Module['m_re_em_golarraybuf'][$9].byteLength - $10) / 4)
            ),
            0
          )
        } else {
          GLctx.texSubImage2D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            new Float32Array(
              Module['m_re_em_golarraybuf'][$9].buffer,
              $10,
              parseInt((Module['m_re_em_golarraybuf'][$9].byteLength - $10) / 4)
            ),
            0
          )
        }
      },
      1831204: ($0, $1, $2, $3, $4, $5, $6, $7, $8) => {
        GLctx.compressedTexImage3D($0, $1, $2, $3, $4, $5, 0, Module['m_re_em_golarraybuf'][$6], $7, $8)
      },
      1831306: ($0, $1, $2, $3, $4, $5) => {
        Module.ctx.texStorage3D($0, $1, $2, $3, $4, $5)
      },
      1831357: ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) => {
        if ($10 == 0) {
          GLctx.texSubImage3D($0, $1, $2, $3, $4, $5, $6, $7, $8, $9, Module['m_re_em_golarraybuf'][$11], $12)
        } else if ($10 == 1) {
          GLctx.texSubImage3D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            new Int8Array(Module['m_re_em_golarraybuf'][$11].buffer, $12),
            0
          )
        } else if ($10 == 2) {
          GLctx.texSubImage3D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            new Uint16Array(
              Module['m_re_em_golarraybuf'][$11].buffer,
              $12,
              parseInt((Module['m_re_em_golarraybuf'][$11].byteLength - $12) / 2)
            ),
            0
          )
        } else if ($10 == 3) {
          GLctx.texSubImage3D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            new Int16Array(
              Module['m_re_em_golarraybuf'][$11].buffer,
              $12,
              parseInt((Module['m_re_em_golarraybuf'][$11].byteLength - $12) / 2)
            ),
            0
          )
        } else if ($10 == 4) {
          GLctx.texSubImage3D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            new Uint32Array(
              Module['m_re_em_golarraybuf'][$11].buffer,
              $12,
              parseInt((Module['m_re_em_golarraybuf'][$11].byteLength - $12) / 4)
            ),
            0
          )
        } else if ($10 == 5) {
          GLctx.texSubImage3D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            new Int32Array(
              Module['m_re_em_golarraybuf'][$11].buffer,
              $12,
              parseInt((Module['m_re_em_golarraybuf'][$11].byteLength - $12) / 4)
            ),
            0
          )
        } else {
          GLctx.texSubImage3D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            new Float32Array(
              Module['m_re_em_golarraybuf'][$11].buffer,
              $12,
              parseInt((Module['m_re_em_golarraybuf'][$11].byteLength - $12) / 4)
            ),
            0
          )
        }
      },
      1832674: ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) => {
        GLctx.compressedTexSubImage2D($0, $1, $2, $3, $4, $5, $6, Module['m_re_em_golarraybuf'][$7], $8, $9)
      },
      1832780: ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) => {
        if ($8 == 0) {
          GLctx.texSubImage2D($0, $1, $2, $3, $4, $5, $6, $7, Module['m_re_em_golarraybuf'][$9], $10)
        } else if ($8 == 1) {
          GLctx.texSubImage2D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            new Int8Array(Module['m_re_em_golarraybuf'][$9].buffer, $10),
            0
          )
        } else if ($8 == 2) {
          GLctx.texSubImage2D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            new Uint16Array(
              Module['m_re_em_golarraybuf'][$9].buffer,
              $10,
              parseInt((Module['m_re_em_golarraybuf'][$9].byteLength - $10) / 2)
            ),
            0
          )
        } else if ($8 == 3) {
          GLctx.texSubImage2D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            new Int16Array(
              Module['m_re_em_golarraybuf'][$9].buffer,
              $10,
              parseInt((Module['m_re_em_golarraybuf'][$9].byteLength - $10) / 2)
            ),
            0
          )
        } else if ($8 == 4) {
          GLctx.texSubImage2D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            new Uint32Array(
              Module['m_re_em_golarraybuf'][$9].buffer,
              $10,
              parseInt((Module['m_re_em_golarraybuf'][$9].byteLength - $10) / 4)
            ),
            0
          )
        } else if ($8 == 5) {
          GLctx.texSubImage2D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            new Int32Array(
              Module['m_re_em_golarraybuf'][$9].buffer,
              $10,
              parseInt((Module['m_re_em_golarraybuf'][$9].byteLength - $10) / 4)
            ),
            0
          )
        } else {
          GLctx.texSubImage2D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            new Float32Array(
              Module['m_re_em_golarraybuf'][$9].buffer,
              $10,
              parseInt((Module['m_re_em_golarraybuf'][$9].byteLength - $10) / 4)
            ),
            0
          )
        }
      },
      1834023: ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) => {
        GLctx.compressedTexSubImage3D($0, $1, $2, $3, $4, $5, $6, $7, $8, Module['m_re_em_golarraybuf'][$9], $10, $11)
      },
      1834139: ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) => {
        if ($10 == 0) {
          GLctx.texSubImage3D($0, $1, $2, $3, $4, $5, $6, $7, $8, $9, Module['m_re_em_golarraybuf'][$11], $12)
        } else if ($10 == 1) {
          GLctx.texSubImage3D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            new Int8Array(Module['m_re_em_golarraybuf'][$11].buffer, $12),
            0
          )
        } else if ($10 == 2) {
          GLctx.texSubImage3D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            new Uint16Array(
              Module['m_re_em_golarraybuf'][$11].buffer,
              $12,
              parseInt((Module['m_re_em_golarraybuf'][$11].byteLength - $12) / 2)
            ),
            0
          )
        } else if ($10 == 3) {
          GLctx.texSubImage3D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            new Int16Array(
              Module['m_re_em_golarraybuf'][$11].buffer,
              $12,
              parseInt((Module['m_re_em_golarraybuf'][$11].byteLength - $12) / 2)
            ),
            0
          )
        } else if ($10 == 4) {
          GLctx.texSubImage3D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            new Uint32Array(
              Module['m_re_em_golarraybuf'][$11].buffer,
              $12,
              parseInt((Module['m_re_em_golarraybuf'][$11].byteLength - $12) / 4)
            ),
            0
          )
        } else if ($10 == 5) {
          GLctx.texSubImage3D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            new Int32Array(
              Module['m_re_em_golarraybuf'][$11].buffer,
              $12,
              parseInt((Module['m_re_em_golarraybuf'][$11].byteLength - $12) / 4)
            ),
            0
          )
        } else {
          GLctx.texSubImage3D(
            $0,
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            new Float32Array(
              Module['m_re_em_golarraybuf'][$11].buffer,
              $12,
              parseInt((Module['m_re_em_golarraybuf'][$11].byteLength - $12) / 4)
            ),
            0
          )
        }
      },
      1835456: () => {
        specialHTMLTargets['#canvas'] = Module.canvas
      },
      1835506: () => {
        Module.canvas.focus()
        realengine_rendererwebgl2_handlemousedown = function (e) {
          if (document.activeElement != Module.canvas) {
            Module.canvas.focus()
          }
          return false
        }
        Module.canvas.addEventListener('mousedown', realengine_rendererwebgl2_handlemousedown, false)
      },
      1835766: () => {
        g_re_EXT_float_blend = GLctx.getExtension('EXT_float_blend')
        return g_re_EXT_float_blend != null ? 1 : 0
      },
      1835873: () => {
        return GLctx.MAX_CLIENT_WAIT_TIMEOUT_WEBGL - 1
      },
      1835921: () => {
        if (typeof realengine_rendererwebgl2_handlemousedown != 'undefined') {
          Module.canvas.removeEventListener('mousedown', realengine_rendererwebgl2_handlemousedown)
        }
      }
    }
    function ExitStatus(status) {
      this.name = 'ExitStatus'
      this.message = 'Program terminated with exit(' + status + ')'
      this.status = status
    }
    function callRuntimeCallbacks(callbacks) {
      while (callbacks.length > 0) {
        callbacks.shift()(Module)
      }
    }
    function setValue(ptr, value, type = 'i8') {
      if (type.endsWith('*')) type = '*'
      switch (type) {
        case 'i1':
          HEAP8[ptr >> 0] = value
          break
        case 'i8':
          HEAP8[ptr >> 0] = value
          break
        case 'i16':
          HEAP16[ptr >> 1] = value
          break
        case 'i32':
          HEAP32[ptr >> 2] = value
          break
        case 'i64':
          ;(tempI64 = [
            value >>> 0,
            ((tempDouble = value),
            +Math.abs(tempDouble) >= 1
              ? tempDouble > 0
                ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0
                : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0
              : 0)
          ]),
            (HEAP32[ptr >> 2] = tempI64[0]),
            (HEAP32[(ptr + 4) >> 2] = tempI64[1])
          break
        case 'float':
          HEAPF32[ptr >> 2] = value
          break
        case 'double':
          HEAPF64[ptr >> 3] = value
          break
        case '*':
          HEAPU32[ptr >> 2] = value
          break
        default:
          abort('invalid type for setValue: ' + type)
      }
    }
    var exceptionCaught = []
    function exception_addRef(info) {
      info.add_ref()
    }
    var uncaughtExceptionCount = 0
    function ___cxa_begin_catch(ptr) {
      var info = new ExceptionInfo(ptr)
      if (!info.get_caught()) {
        info.set_caught(true)
        uncaughtExceptionCount--
      }
      info.set_rethrown(false)
      exceptionCaught.push(info)
      exception_addRef(info)
      return info.get_exception_ptr()
    }
    var exceptionLast = 0
    var wasmTableMirror = []
    function getWasmTableEntry(funcPtr) {
      var func = wasmTableMirror[funcPtr]
      if (!func) {
        if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1
        wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr)
      }
      return func
    }
    function exception_decRef(info) {
      if (info.release_ref() && !info.get_rethrown()) {
        var destructor = info.get_destructor()
        if (destructor) {
          getWasmTableEntry(destructor)(info.excPtr)
        }
        ___cxa_free_exception(info.excPtr)
      }
    }
    function ___cxa_end_catch() {
      _setThrew(0)
      var info = exceptionCaught.pop()
      exception_decRef(info)
      exceptionLast = 0
    }
    function ExceptionInfo(excPtr) {
      this.excPtr = excPtr
      this.ptr = excPtr - 24
      this.set_type = function (type) {
        HEAPU32[(this.ptr + 4) >> 2] = type
      }
      this.get_type = function () {
        return HEAPU32[(this.ptr + 4) >> 2]
      }
      this.set_destructor = function (destructor) {
        HEAPU32[(this.ptr + 8) >> 2] = destructor
      }
      this.get_destructor = function () {
        return HEAPU32[(this.ptr + 8) >> 2]
      }
      this.set_refcount = function (refcount) {
        HEAP32[this.ptr >> 2] = refcount
      }
      this.set_caught = function (caught) {
        caught = caught ? 1 : 0
        HEAP8[(this.ptr + 12) >> 0] = caught
      }
      this.get_caught = function () {
        return HEAP8[(this.ptr + 12) >> 0] != 0
      }
      this.set_rethrown = function (rethrown) {
        rethrown = rethrown ? 1 : 0
        HEAP8[(this.ptr + 13) >> 0] = rethrown
      }
      this.get_rethrown = function () {
        return HEAP8[(this.ptr + 13) >> 0] != 0
      }
      this.init = function (type, destructor) {
        this.set_adjusted_ptr(0)
        this.set_type(type)
        this.set_destructor(destructor)
        this.set_refcount(0)
        this.set_caught(false)
        this.set_rethrown(false)
      }
      this.add_ref = function () {
        var value = HEAP32[this.ptr >> 2]
        HEAP32[this.ptr >> 2] = value + 1
      }
      this.release_ref = function () {
        var prev = HEAP32[this.ptr >> 2]
        HEAP32[this.ptr >> 2] = prev - 1
        return prev === 1
      }
      this.set_adjusted_ptr = function (adjustedPtr) {
        HEAPU32[(this.ptr + 16) >> 2] = adjustedPtr
      }
      this.get_adjusted_ptr = function () {
        return HEAPU32[(this.ptr + 16) >> 2]
      }
      this.get_exception_ptr = function () {
        var isPointer = ___cxa_is_pointer_type(this.get_type())
        if (isPointer) {
          return HEAPU32[this.excPtr >> 2]
        }
        var adjusted = this.get_adjusted_ptr()
        if (adjusted !== 0) return adjusted
        return this.excPtr
      }
    }
    function ___resumeException(ptr) {
      if (!exceptionLast) {
        exceptionLast = ptr
      }
      throw ptr
    }
    function ___cxa_find_matching_catch() {
      var thrown = exceptionLast
      if (!thrown) {
        setTempRet0(0)
        return 0
      }
      var info = new ExceptionInfo(thrown)
      info.set_adjusted_ptr(thrown)
      var thrownType = info.get_type()
      if (!thrownType) {
        setTempRet0(0)
        return thrown
      }
      for (var i = 0; i < arguments.length; i++) {
        var caughtType = arguments[i]
        if (caughtType === 0 || caughtType === thrownType) {
          break
        }
        var adjusted_ptr_addr = info.ptr + 16
        if (___cxa_can_catch(caughtType, thrownType, adjusted_ptr_addr)) {
          setTempRet0(caughtType)
          return thrown
        }
      }
      setTempRet0(thrownType)
      return thrown
    }
    var ___cxa_find_matching_catch_2 = ___cxa_find_matching_catch
    var ___cxa_find_matching_catch_3 = ___cxa_find_matching_catch
    var ___cxa_find_matching_catch_4 = ___cxa_find_matching_catch
    var ___cxa_find_matching_catch_5 = ___cxa_find_matching_catch
    function ___cxa_rethrow() {
      var info = exceptionCaught.pop()
      if (!info) {
        abort('no exception to throw')
      }
      var ptr = info.excPtr
      if (!info.get_rethrown()) {
        exceptionCaught.push(info)
        info.set_rethrown(true)
        info.set_caught(false)
        uncaughtExceptionCount++
      }
      exceptionLast = ptr
      throw ptr
    }
    function ___cxa_throw(ptr, type, destructor) {
      var info = new ExceptionInfo(ptr)
      info.init(type, destructor)
      exceptionLast = ptr
      uncaughtExceptionCount++
      throw ptr
    }
    function ___cxa_uncaught_exceptions() {
      return uncaughtExceptionCount
    }
    var PATH = {
      isAbs: (path) => path.charAt(0) === '/',
      splitPath: (filename) => {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
        return splitPathRe.exec(filename).slice(1)
      },
      normalizeArray: (parts, allowAboveRoot) => {
        var up = 0
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i]
          if (last === '.') {
            parts.splice(i, 1)
          } else if (last === '..') {
            parts.splice(i, 1)
            up++
          } else if (up) {
            parts.splice(i, 1)
            up--
          }
        }
        if (allowAboveRoot) {
          for (; up; up--) {
            parts.unshift('..')
          }
        }
        return parts
      },
      normalize: (path) => {
        var isAbsolute = PATH.isAbs(path),
          trailingSlash = path.substr(-1) === '/'
        path = PATH.normalizeArray(
          path.split('/').filter((p) => !!p),
          !isAbsolute
        ).join('/')
        if (!path && !isAbsolute) {
          path = '.'
        }
        if (path && trailingSlash) {
          path += '/'
        }
        return (isAbsolute ? '/' : '') + path
      },
      dirname: (path) => {
        var result = PATH.splitPath(path),
          root = result[0],
          dir = result[1]
        if (!root && !dir) {
          return '.'
        }
        if (dir) {
          dir = dir.substr(0, dir.length - 1)
        }
        return root + dir
      },
      basename: (path) => {
        if (path === '/') return '/'
        path = PATH.normalize(path)
        path = path.replace(/\/$/, '')
        var lastSlash = path.lastIndexOf('/')
        if (lastSlash === -1) return path
        return path.substr(lastSlash + 1)
      },
      join: function () {
        var paths = Array.prototype.slice.call(arguments)
        return PATH.normalize(paths.join('/'))
      },
      join2: (l, r) => {
        return PATH.normalize(l + '/' + r)
      }
    }
    function getRandomDevice() {
      if (typeof crypto == 'object' && typeof crypto['getRandomValues'] == 'function') {
        var randomBuffer = new Uint8Array(1)
        return () => {
          crypto.getRandomValues(randomBuffer)
          return randomBuffer[0]
        }
      } else if (ENVIRONMENT_IS_NODE) {
        try {
          var crypto_module = require('crypto')
          return () => crypto_module['randomBytes'](1)[0]
        } catch (e) {}
      }
      return () => abort('randomDevice')
    }
    var PATH_FS = {
      resolve: function () {
        var resolvedPath = '',
          resolvedAbsolute = false
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = i >= 0 ? arguments[i] : FS.cwd()
          if (typeof path != 'string') {
            throw new TypeError('Arguments to path.resolve must be strings')
          } else if (!path) {
            return ''
          }
          resolvedPath = path + '/' + resolvedPath
          resolvedAbsolute = PATH.isAbs(path)
        }
        resolvedPath = PATH.normalizeArray(
          resolvedPath.split('/').filter((p) => !!p),
          !resolvedAbsolute
        ).join('/')
        return (resolvedAbsolute ? '/' : '') + resolvedPath || '.'
      },
      relative: (from, to) => {
        from = PATH_FS.resolve(from).substr(1)
        to = PATH_FS.resolve(to).substr(1)
        function trim(arr) {
          var start = 0
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break
          }
          var end = arr.length - 1
          for (; end >= 0; end--) {
            if (arr[end] !== '') break
          }
          if (start > end) return []
          return arr.slice(start, end - start + 1)
        }
        var fromParts = trim(from.split('/'))
        var toParts = trim(to.split('/'))
        var length = Math.min(fromParts.length, toParts.length)
        var samePartsLength = length
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i
            break
          }
        }
        var outputParts = []
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..')
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength))
        return outputParts.join('/')
      }
    }
    function intArrayFromString(stringy, dontAddNull, length) {
      var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1
      var u8array = new Array(len)
      var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length)
      if (dontAddNull) u8array.length = numBytesWritten
      return u8array
    }
    var TTY = {
      ttys: [],
      init: function () {},
      shutdown: function () {},
      register: function (dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops }
        FS.registerDevice(dev, TTY.stream_ops)
      },
      stream_ops: {
        open: function (stream) {
          var tty = TTY.ttys[stream.node.rdev]
          if (!tty) {
            throw new FS.ErrnoError(43)
          }
          stream.tty = tty
          stream.seekable = false
        },
        close: function (stream) {
          stream.tty.ops.fsync(stream.tty)
        },
        fsync: function (stream) {
          stream.tty.ops.fsync(stream.tty)
        },
        read: function (stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(60)
          }
          var bytesRead = 0
          for (var i = 0; i < length; i++) {
            var result
            try {
              result = stream.tty.ops.get_char(stream.tty)
            } catch (e) {
              throw new FS.ErrnoError(29)
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(6)
            }
            if (result === null || result === undefined) break
            bytesRead++
            buffer[offset + i] = result
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now()
          }
          return bytesRead
        },
        write: function (stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(60)
          }
          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer[offset + i])
            }
          } catch (e) {
            throw new FS.ErrnoError(29)
          }
          if (length) {
            stream.node.timestamp = Date.now()
          }
          return i
        }
      },
      default_tty_ops: {
        get_char: function (tty) {
          if (!tty.input.length) {
            var result = null
            if (ENVIRONMENT_IS_NODE) {
              var BUFSIZE = 256
              var buf = Buffer.alloc(BUFSIZE)
              var bytesRead = 0
              try {
                bytesRead = fs.readSync(process.stdin.fd, buf, 0, BUFSIZE, -1)
              } catch (e) {
                if (e.toString().includes('EOF')) bytesRead = 0
                else throw e
              }
              if (bytesRead > 0) {
                result = buf.slice(0, bytesRead).toString('utf-8')
              } else {
                result = null
              }
            } else if (typeof window != 'undefined' && typeof window.prompt == 'function') {
              result = window.prompt('Input: ')
              if (result !== null) {
                result += '\n'
              }
            } else if (typeof readline == 'function') {
              result = readline()
              if (result !== null) {
                result += '\n'
              }
            }
            if (!result) {
              return null
            }
            tty.input = intArrayFromString(result, true)
          }
          return tty.input.shift()
        },
        put_char: function (tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output, 0))
            tty.output = []
          } else {
            if (val != 0) tty.output.push(val)
          }
        },
        fsync: function (tty) {
          if (tty.output && tty.output.length > 0) {
            out(UTF8ArrayToString(tty.output, 0))
            tty.output = []
          }
        }
      },
      default_tty1_ops: {
        put_char: function (tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output, 0))
            tty.output = []
          } else {
            if (val != 0) tty.output.push(val)
          }
        },
        fsync: function (tty) {
          if (tty.output && tty.output.length > 0) {
            err(UTF8ArrayToString(tty.output, 0))
            tty.output = []
          }
        }
      }
    }
    function zeroMemory(address, size) {
      HEAPU8.fill(0, address, address + size)
      return address
    }
    function alignMemory(size, alignment) {
      return Math.ceil(size / alignment) * alignment
    }
    function mmapAlloc(size) {
      size = alignMemory(size, 65536)
      var ptr = _emscripten_builtin_memalign(65536, size)
      if (!ptr) return 0
      return zeroMemory(ptr, size)
    }
    var MEMFS = {
      ops_table: null,
      mount: function (mount) {
        return MEMFS.createNode(null, '/', 16384 | 511, 0)
      },
      createNode: function (parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          throw new FS.ErrnoError(63)
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: { llseek: MEMFS.stream_ops.llseek }
            },
            file: {
              node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap,
                msync: MEMFS.stream_ops.msync
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr },
              stream: FS.chrdev_stream_ops
            }
          }
        }
        var node = FS.createNode(parent, name, mode, dev)
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node
          node.stream_ops = MEMFS.ops_table.dir.stream
          node.contents = {}
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node
          node.stream_ops = MEMFS.ops_table.file.stream
          node.usedBytes = 0
          node.contents = null
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node
          node.stream_ops = MEMFS.ops_table.link.stream
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node
          node.stream_ops = MEMFS.ops_table.chrdev.stream
        }
        node.timestamp = Date.now()
        if (parent) {
          parent.contents[name] = node
          parent.timestamp = node.timestamp
        }
        return node
      },
      getFileDataAsTypedArray: function (node) {
        if (!node.contents) return new Uint8Array(0)
        if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes)
        return new Uint8Array(node.contents)
      },
      expandFileStorage: function (node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0
        if (prevCapacity >= newCapacity) return
        var CAPACITY_DOUBLING_MAX = 1024 * 1024
        newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125)) >>> 0)
        if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256)
        var oldContents = node.contents
        node.contents = new Uint8Array(newCapacity)
        if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0)
      },
      resizeFileStorage: function (node, newSize) {
        if (node.usedBytes == newSize) return
        if (newSize == 0) {
          node.contents = null
          node.usedBytes = 0
        } else {
          var oldContents = node.contents
          node.contents = new Uint8Array(newSize)
          if (oldContents) {
            node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)))
          }
          node.usedBytes = newSize
        }
      },
      node_ops: {
        getattr: function (node) {
          var attr = {}
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1
          attr.ino = node.id
          attr.mode = node.mode
          attr.nlink = 1
          attr.uid = 0
          attr.gid = 0
          attr.rdev = node.rdev
          if (FS.isDir(node.mode)) {
            attr.size = 4096
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length
          } else {
            attr.size = 0
          }
          attr.atime = new Date(node.timestamp)
          attr.mtime = new Date(node.timestamp)
          attr.ctime = new Date(node.timestamp)
          attr.blksize = 4096
          attr.blocks = Math.ceil(attr.size / attr.blksize)
          return attr
        },
        setattr: function (node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp
          }
          if (attr.size !== undefined) {
            MEMFS.resizeFileStorage(node, attr.size)
          }
        },
        lookup: function (parent, name) {
          throw FS.genericErrors[44]
        },
        mknod: function (parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev)
        },
        rename: function (old_node, new_dir, new_name) {
          if (FS.isDir(old_node.mode)) {
            var new_node
            try {
              new_node = FS.lookupNode(new_dir, new_name)
            } catch (e) {}
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(55)
              }
            }
          }
          delete old_node.parent.contents[old_node.name]
          old_node.parent.timestamp = Date.now()
          old_node.name = new_name
          new_dir.contents[new_name] = old_node
          new_dir.timestamp = old_node.parent.timestamp
          old_node.parent = new_dir
        },
        unlink: function (parent, name) {
          delete parent.contents[name]
          parent.timestamp = Date.now()
        },
        rmdir: function (parent, name) {
          var node = FS.lookupNode(parent, name)
          for (var i in node.contents) {
            throw new FS.ErrnoError(55)
          }
          delete parent.contents[name]
          parent.timestamp = Date.now()
        },
        readdir: function (node) {
          var entries = ['.', '..']
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue
            }
            entries.push(key)
          }
          return entries
        },
        symlink: function (parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 | 40960, 0)
          node.link = oldpath
          return node
        },
        readlink: function (node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(28)
          }
          return node.link
        }
      },
      stream_ops: {
        read: function (stream, buffer, offset, length, position) {
          var contents = stream.node.contents
          if (position >= stream.node.usedBytes) return 0
          var size = Math.min(stream.node.usedBytes - position, length)
          if (size > 8 && contents.subarray) {
            buffer.set(contents.subarray(position, position + size), offset)
          } else {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i]
          }
          return size
        },
        write: function (stream, buffer, offset, length, position, canOwn) {
          if (buffer.buffer === HEAP8.buffer) {
            canOwn = false
          }
          if (!length) return 0
          var node = stream.node
          node.timestamp = Date.now()
          if (buffer.subarray && (!node.contents || node.contents.subarray)) {
            if (canOwn) {
              node.contents = buffer.subarray(offset, offset + length)
              node.usedBytes = length
              return length
            } else if (node.usedBytes === 0 && position === 0) {
              node.contents = buffer.slice(offset, offset + length)
              node.usedBytes = length
              return length
            } else if (position + length <= node.usedBytes) {
              node.contents.set(buffer.subarray(offset, offset + length), position)
              return length
            }
          }
          MEMFS.expandFileStorage(node, position + length)
          if (node.contents.subarray && buffer.subarray) {
            node.contents.set(buffer.subarray(offset, offset + length), position)
          } else {
            for (var i = 0; i < length; i++) {
              node.contents[position + i] = buffer[offset + i]
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position + length)
          return length
        },
        llseek: function (stream, offset, whence) {
          var position = offset
          if (whence === 1) {
            position += stream.position
          } else if (whence === 2) {
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28)
          }
          return position
        },
        allocate: function (stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length)
          stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length)
        },
        mmap: function (stream, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43)
          }
          var ptr
          var allocated
          var contents = stream.node.contents
          if (!(flags & 2) && contents.buffer === HEAP8.buffer) {
            allocated = false
            ptr = contents.byteOffset
          } else {
            if (position > 0 || position + length < contents.length) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length)
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length)
              }
            }
            allocated = true
            ptr = mmapAlloc(length)
            if (!ptr) {
              throw new FS.ErrnoError(48)
            }
            HEAP8.set(contents, ptr)
          }
          return { ptr: ptr, allocated: allocated }
        },
        msync: function (stream, buffer, offset, length, mmapFlags) {
          MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false)
          return 0
        }
      }
    }
    function asyncLoad(url, onload, onerror, noRunDep) {
      var dep = !noRunDep ? getUniqueRunDependency('al ' + url) : ''
      readAsync(
        url,
        (arrayBuffer) => {
          assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).')
          onload(new Uint8Array(arrayBuffer))
          if (dep) removeRunDependency(dep)
        },
        (event) => {
          if (onerror) {
            onerror()
          } else {
            throw 'Loading data file "' + url + '" failed.'
          }
        }
      )
      if (dep) addRunDependency(dep)
    }
    var FS = {
      root: null,
      mounts: [],
      devices: {},
      streams: [],
      nextInode: 1,
      nameTable: null,
      currentPath: '/',
      initialized: false,
      ignorePermissions: true,
      ErrnoError: null,
      genericErrors: {},
      filesystems: null,
      syncFSRequests: 0,
      lookupPath: (path, opts = {}) => {
        path = PATH_FS.resolve(path)
        if (!path) return { path: '', node: null }
        var defaults = { follow_mount: true, recurse_count: 0 }
        opts = Object.assign(defaults, opts)
        if (opts.recurse_count > 8) {
          throw new FS.ErrnoError(32)
        }
        var parts = path.split('/').filter((p) => !!p)
        var current = FS.root
        var current_path = '/'
        for (var i = 0; i < parts.length; i++) {
          var islast = i === parts.length - 1
          if (islast && opts.parent) {
            break
          }
          current = FS.lookupNode(current, parts[i])
          current_path = PATH.join2(current_path, parts[i])
          if (FS.isMountpoint(current)) {
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root
            }
          }
          if (!islast || opts.follow) {
            var count = 0
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path)
              current_path = PATH_FS.resolve(PATH.dirname(current_path), link)
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count + 1 })
              current = lookup.node
              if (count++ > 40) {
                throw new FS.ErrnoError(32)
              }
            }
          }
        }
        return { path: current_path, node: current }
      },
      getPath: (node) => {
        var path
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint
            if (!path) return mount
            return mount[mount.length - 1] !== '/' ? mount + '/' + path : mount + path
          }
          path = path ? node.name + '/' + path : node.name
          node = node.parent
        }
      },
      hashName: (parentid, name) => {
        var hash = 0
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length
      },
      hashAddNode: (node) => {
        var hash = FS.hashName(node.parent.id, node.name)
        node.name_next = FS.nameTable[hash]
        FS.nameTable[hash] = node
      },
      hashRemoveNode: (node) => {
        var hash = FS.hashName(node.parent.id, node.name)
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next
        } else {
          var current = FS.nameTable[hash]
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next
              break
            }
            current = current.name_next
          }
        }
      },
      lookupNode: (parent, name) => {
        var errCode = FS.mayLookup(parent)
        if (errCode) {
          throw new FS.ErrnoError(errCode, parent)
        }
        var hash = FS.hashName(parent.id, name)
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name
          if (node.parent.id === parent.id && nodeName === name) {
            return node
          }
        }
        return FS.lookup(parent, name)
      },
      createNode: (parent, name, mode, rdev) => {
        var node = new FS.FSNode(parent, name, mode, rdev)
        FS.hashAddNode(node)
        return node
      },
      destroyNode: (node) => {
        FS.hashRemoveNode(node)
      },
      isRoot: (node) => {
        return node === node.parent
      },
      isMountpoint: (node) => {
        return !!node.mounted
      },
      isFile: (mode) => {
        return (mode & 61440) === 32768
      },
      isDir: (mode) => {
        return (mode & 61440) === 16384
      },
      isLink: (mode) => {
        return (mode & 61440) === 40960
      },
      isChrdev: (mode) => {
        return (mode & 61440) === 8192
      },
      isBlkdev: (mode) => {
        return (mode & 61440) === 24576
      },
      isFIFO: (mode) => {
        return (mode & 61440) === 4096
      },
      isSocket: (mode) => {
        return (mode & 49152) === 49152
      },
      flagModes: { r: 0, 'r+': 2, w: 577, 'w+': 578, a: 1089, 'a+': 1090 },
      modeStringToFlags: (str) => {
        var flags = FS.flagModes[str]
        if (typeof flags == 'undefined') {
          throw new Error('Unknown file open mode: ' + str)
        }
        return flags
      },
      flagsToPermissionString: (flag) => {
        var perms = ['r', 'w', 'rw'][flag & 3]
        if (flag & 512) {
          perms += 'w'
        }
        return perms
      },
      nodePermissions: (node, perms) => {
        if (FS.ignorePermissions) {
          return 0
        }
        if (perms.includes('r') && !(node.mode & 292)) {
          return 2
        } else if (perms.includes('w') && !(node.mode & 146)) {
          return 2
        } else if (perms.includes('x') && !(node.mode & 73)) {
          return 2
        }
        return 0
      },
      mayLookup: (dir) => {
        var errCode = FS.nodePermissions(dir, 'x')
        if (errCode) return errCode
        if (!dir.node_ops.lookup) return 2
        return 0
      },
      mayCreate: (dir, name) => {
        try {
          var node = FS.lookupNode(dir, name)
          return 20
        } catch (e) {}
        return FS.nodePermissions(dir, 'wx')
      },
      mayDelete: (dir, name, isdir) => {
        var node
        try {
          node = FS.lookupNode(dir, name)
        } catch (e) {
          return e.errno
        }
        var errCode = FS.nodePermissions(dir, 'wx')
        if (errCode) {
          return errCode
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return 54
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return 10
          }
        } else {
          if (FS.isDir(node.mode)) {
            return 31
          }
        }
        return 0
      },
      mayOpen: (node, flags) => {
        if (!node) {
          return 44
        }
        if (FS.isLink(node.mode)) {
          return 32
        } else if (FS.isDir(node.mode)) {
          if (FS.flagsToPermissionString(flags) !== 'r' || flags & 512) {
            return 31
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags))
      },
      MAX_OPEN_FDS: 4096,
      nextfd: (fd_start = 0, fd_end = FS.MAX_OPEN_FDS) => {
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd
          }
        }
        throw new FS.ErrnoError(33)
      },
      getStream: (fd) => FS.streams[fd],
      createStream: (stream, fd_start, fd_end) => {
        if (!FS.FSStream) {
          FS.FSStream = function () {
            this.shared = {}
          }
          FS.FSStream.prototype = {}
          Object.defineProperties(FS.FSStream.prototype, {
            object: {
              get: function () {
                return this.node
              },
              set: function (val) {
                this.node = val
              }
            },
            isRead: {
              get: function () {
                return (this.flags & 2097155) !== 1
              }
            },
            isWrite: {
              get: function () {
                return (this.flags & 2097155) !== 0
              }
            },
            isAppend: {
              get: function () {
                return this.flags & 1024
              }
            },
            flags: {
              get: function () {
                return this.shared.flags
              },
              set: function (val) {
                this.shared.flags = val
              }
            },
            position: {
              get: function () {
                return this.shared.position
              },
              set: function (val) {
                this.shared.position = val
              }
            }
          })
        }
        stream = Object.assign(new FS.FSStream(), stream)
        var fd = FS.nextfd(fd_start, fd_end)
        stream.fd = fd
        FS.streams[fd] = stream
        return stream
      },
      closeStream: (fd) => {
        FS.streams[fd] = null
      },
      chrdev_stream_ops: {
        open: (stream) => {
          var device = FS.getDevice(stream.node.rdev)
          stream.stream_ops = device.stream_ops
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream)
          }
        },
        llseek: () => {
          throw new FS.ErrnoError(70)
        }
      },
      major: (dev) => dev >> 8,
      minor: (dev) => dev & 255,
      makedev: (ma, mi) => (ma << 8) | mi,
      registerDevice: (dev, ops) => {
        FS.devices[dev] = { stream_ops: ops }
      },
      getDevice: (dev) => FS.devices[dev],
      getMounts: (mount) => {
        var mounts = []
        var check = [mount]
        while (check.length) {
          var m = check.pop()
          mounts.push(m)
          check.push.apply(check, m.mounts)
        }
        return mounts
      },
      syncfs: (populate, callback) => {
        if (typeof populate == 'function') {
          callback = populate
          populate = false
        }
        FS.syncFSRequests++
        if (FS.syncFSRequests > 1) {
          err(
            'warning: ' + FS.syncFSRequests + ' FS.syncfs operations in flight at once, probably just doing extra work'
          )
        }
        var mounts = FS.getMounts(FS.root.mount)
        var completed = 0
        function doCallback(errCode) {
          FS.syncFSRequests--
          return callback(errCode)
        }
        function done(errCode) {
          if (errCode) {
            if (!done.errored) {
              done.errored = true
              return doCallback(errCode)
            }
            return
          }
          if (++completed >= mounts.length) {
            doCallback(null)
          }
        }
        mounts.forEach((mount) => {
          if (!mount.type.syncfs) {
            return done(null)
          }
          mount.type.syncfs(mount, populate, done)
        })
      },
      mount: (type, opts, mountpoint) => {
        var root = mountpoint === '/'
        var pseudo = !mountpoint
        var node
        if (root && FS.root) {
          throw new FS.ErrnoError(10)
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false })
          mountpoint = lookup.path
          node = lookup.node
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10)
          }
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54)
          }
        }
        var mount = { type: type, opts: opts, mountpoint: mountpoint, mounts: [] }
        var mountRoot = type.mount(mount)
        mountRoot.mount = mount
        mount.root = mountRoot
        if (root) {
          FS.root = mountRoot
        } else if (node) {
          node.mounted = mount
          if (node.mount) {
            node.mount.mounts.push(mount)
          }
        }
        return mountRoot
      },
      unmount: (mountpoint) => {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false })
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(28)
        }
        var node = lookup.node
        var mount = node.mounted
        var mounts = FS.getMounts(mount)
        Object.keys(FS.nameTable).forEach((hash) => {
          var current = FS.nameTable[hash]
          while (current) {
            var next = current.name_next
            if (mounts.includes(current.mount)) {
              FS.destroyNode(current)
            }
            current = next
          }
        })
        node.mounted = null
        var idx = node.mount.mounts.indexOf(mount)
        node.mount.mounts.splice(idx, 1)
      },
      lookup: (parent, name) => {
        return parent.node_ops.lookup(parent, name)
      },
      mknod: (path, mode, dev) => {
        var lookup = FS.lookupPath(path, { parent: true })
        var parent = lookup.node
        var name = PATH.basename(path)
        if (!name || name === '.' || name === '..') {
          throw new FS.ErrnoError(28)
        }
        var errCode = FS.mayCreate(parent, name)
        if (errCode) {
          throw new FS.ErrnoError(errCode)
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(63)
        }
        return parent.node_ops.mknod(parent, name, mode, dev)
      },
      create: (path, mode) => {
        mode = mode !== undefined ? mode : 438
        mode &= 4095
        mode |= 32768
        return FS.mknod(path, mode, 0)
      },
      mkdir: (path, mode) => {
        mode = mode !== undefined ? mode : 511
        mode &= 511 | 512
        mode |= 16384
        return FS.mknod(path, mode, 0)
      },
      mkdirTree: (path, mode) => {
        var dirs = path.split('/')
        var d = ''
        for (var i = 0; i < dirs.length; ++i) {
          if (!dirs[i]) continue
          d += '/' + dirs[i]
          try {
            FS.mkdir(d, mode)
          } catch (e) {
            if (e.errno != 20) throw e
          }
        }
      },
      mkdev: (path, mode, dev) => {
        if (typeof dev == 'undefined') {
          dev = mode
          mode = 438
        }
        mode |= 8192
        return FS.mknod(path, mode, dev)
      },
      symlink: (oldpath, newpath) => {
        if (!PATH_FS.resolve(oldpath)) {
          throw new FS.ErrnoError(44)
        }
        var lookup = FS.lookupPath(newpath, { parent: true })
        var parent = lookup.node
        if (!parent) {
          throw new FS.ErrnoError(44)
        }
        var newname = PATH.basename(newpath)
        var errCode = FS.mayCreate(parent, newname)
        if (errCode) {
          throw new FS.ErrnoError(errCode)
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(63)
        }
        return parent.node_ops.symlink(parent, newname, oldpath)
      },
      rename: (old_path, new_path) => {
        var old_dirname = PATH.dirname(old_path)
        var new_dirname = PATH.dirname(new_path)
        var old_name = PATH.basename(old_path)
        var new_name = PATH.basename(new_path)
        var lookup, old_dir, new_dir
        lookup = FS.lookupPath(old_path, { parent: true })
        old_dir = lookup.node
        lookup = FS.lookupPath(new_path, { parent: true })
        new_dir = lookup.node
        if (!old_dir || !new_dir) throw new FS.ErrnoError(44)
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(75)
        }
        var old_node = FS.lookupNode(old_dir, old_name)
        var relative = PATH_FS.relative(old_path, new_dirname)
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(28)
        }
        relative = PATH_FS.relative(new_path, old_dirname)
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(55)
        }
        var new_node
        try {
          new_node = FS.lookupNode(new_dir, new_name)
        } catch (e) {}
        if (old_node === new_node) {
          return
        }
        var isdir = FS.isDir(old_node.mode)
        var errCode = FS.mayDelete(old_dir, old_name, isdir)
        if (errCode) {
          throw new FS.ErrnoError(errCode)
        }
        errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name)
        if (errCode) {
          throw new FS.ErrnoError(errCode)
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(63)
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(10)
        }
        if (new_dir !== old_dir) {
          errCode = FS.nodePermissions(old_dir, 'w')
          if (errCode) {
            throw new FS.ErrnoError(errCode)
          }
        }
        FS.hashRemoveNode(old_node)
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name)
        } catch (e) {
          throw e
        } finally {
          FS.hashAddNode(old_node)
        }
      },
      rmdir: (path) => {
        var lookup = FS.lookupPath(path, { parent: true })
        var parent = lookup.node
        var name = PATH.basename(path)
        var node = FS.lookupNode(parent, name)
        var errCode = FS.mayDelete(parent, name, true)
        if (errCode) {
          throw new FS.ErrnoError(errCode)
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(63)
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10)
        }
        parent.node_ops.rmdir(parent, name)
        FS.destroyNode(node)
      },
      readdir: (path) => {
        var lookup = FS.lookupPath(path, { follow: true })
        var node = lookup.node
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(54)
        }
        return node.node_ops.readdir(node)
      },
      unlink: (path) => {
        var lookup = FS.lookupPath(path, { parent: true })
        var parent = lookup.node
        if (!parent) {
          throw new FS.ErrnoError(44)
        }
        var name = PATH.basename(path)
        var node = FS.lookupNode(parent, name)
        var errCode = FS.mayDelete(parent, name, false)
        if (errCode) {
          throw new FS.ErrnoError(errCode)
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(63)
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10)
        }
        parent.node_ops.unlink(parent, name)
        FS.destroyNode(node)
      },
      readlink: (path) => {
        var lookup = FS.lookupPath(path)
        var link = lookup.node
        if (!link) {
          throw new FS.ErrnoError(44)
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(28)
        }
        return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link))
      },
      stat: (path, dontFollow) => {
        var lookup = FS.lookupPath(path, { follow: !dontFollow })
        var node = lookup.node
        if (!node) {
          throw new FS.ErrnoError(44)
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(63)
        }
        return node.node_ops.getattr(node)
      },
      lstat: (path) => {
        return FS.stat(path, true)
      },
      chmod: (path, mode, dontFollow) => {
        var node
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow })
          node = lookup.node
        } else {
          node = path
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63)
        }
        node.node_ops.setattr(node, { mode: (mode & 4095) | (node.mode & ~4095), timestamp: Date.now() })
      },
      lchmod: (path, mode) => {
        FS.chmod(path, mode, true)
      },
      fchmod: (fd, mode) => {
        var stream = FS.getStream(fd)
        if (!stream) {
          throw new FS.ErrnoError(8)
        }
        FS.chmod(stream.node, mode)
      },
      chown: (path, uid, gid, dontFollow) => {
        var node
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow })
          node = lookup.node
        } else {
          node = path
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63)
        }
        node.node_ops.setattr(node, { timestamp: Date.now() })
      },
      lchown: (path, uid, gid) => {
        FS.chown(path, uid, gid, true)
      },
      fchown: (fd, uid, gid) => {
        var stream = FS.getStream(fd)
        if (!stream) {
          throw new FS.ErrnoError(8)
        }
        FS.chown(stream.node, uid, gid)
      },
      truncate: (path, len) => {
        if (len < 0) {
          throw new FS.ErrnoError(28)
        }
        var node
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: true })
          node = lookup.node
        } else {
          node = path
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63)
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(31)
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(28)
        }
        var errCode = FS.nodePermissions(node, 'w')
        if (errCode) {
          throw new FS.ErrnoError(errCode)
        }
        node.node_ops.setattr(node, { size: len, timestamp: Date.now() })
      },
      ftruncate: (fd, len) => {
        var stream = FS.getStream(fd)
        if (!stream) {
          throw new FS.ErrnoError(8)
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(28)
        }
        FS.truncate(stream.node, len)
      },
      utime: (path, atime, mtime) => {
        var lookup = FS.lookupPath(path, { follow: true })
        var node = lookup.node
        node.node_ops.setattr(node, { timestamp: Math.max(atime, mtime) })
      },
      open: (path, flags, mode) => {
        if (path === '') {
          throw new FS.ErrnoError(44)
        }
        flags = typeof flags == 'string' ? FS.modeStringToFlags(flags) : flags
        mode = typeof mode == 'undefined' ? 438 : mode
        if (flags & 64) {
          mode = (mode & 4095) | 32768
        } else {
          mode = 0
        }
        var node
        if (typeof path == 'object') {
          node = path
        } else {
          path = PATH.normalize(path)
          try {
            var lookup = FS.lookupPath(path, { follow: !(flags & 131072) })
            node = lookup.node
          } catch (e) {}
        }
        var created = false
        if (flags & 64) {
          if (node) {
            if (flags & 128) {
              throw new FS.ErrnoError(20)
            }
          } else {
            node = FS.mknod(path, mode, 0)
            created = true
          }
        }
        if (!node) {
          throw new FS.ErrnoError(44)
        }
        if (FS.isChrdev(node.mode)) {
          flags &= ~512
        }
        if (flags & 65536 && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54)
        }
        if (!created) {
          var errCode = FS.mayOpen(node, flags)
          if (errCode) {
            throw new FS.ErrnoError(errCode)
          }
        }
        if (flags & 512 && !created) {
          FS.truncate(node, 0)
        }
        flags &= ~(128 | 512 | 131072)
        var stream = FS.createStream({
          node: node,
          path: FS.getPath(node),
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          ungotten: [],
          error: false
        })
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream)
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {}
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1
          }
        }
        return stream
      },
      close: (stream) => {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8)
        }
        if (stream.getdents) stream.getdents = null
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream)
          }
        } catch (e) {
          throw e
        } finally {
          FS.closeStream(stream.fd)
        }
        stream.fd = null
      },
      isClosed: (stream) => {
        return stream.fd === null
      },
      llseek: (stream, offset, whence) => {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8)
        }
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(70)
        }
        if (whence != 0 && whence != 1 && whence != 2) {
          throw new FS.ErrnoError(28)
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence)
        stream.ungotten = []
        return stream.position
      },
      read: (stream, buffer, offset, length, position) => {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28)
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8)
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(8)
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31)
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(28)
        }
        var seeking = typeof position != 'undefined'
        if (!seeking) {
          position = stream.position
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70)
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position)
        if (!seeking) stream.position += bytesRead
        return bytesRead
      },
      write: (stream, buffer, offset, length, position, canOwn) => {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28)
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8)
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8)
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31)
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(28)
        }
        if (stream.seekable && stream.flags & 1024) {
          FS.llseek(stream, 0, 2)
        }
        var seeking = typeof position != 'undefined'
        if (!seeking) {
          position = stream.position
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70)
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn)
        if (!seeking) stream.position += bytesWritten
        return bytesWritten
      },
      allocate: (stream, offset, length) => {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8)
        }
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(28)
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8)
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(43)
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(138)
        }
        stream.stream_ops.allocate(stream, offset, length)
      },
      mmap: (stream, length, position, prot, flags) => {
        if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
          throw new FS.ErrnoError(2)
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(2)
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(43)
        }
        return stream.stream_ops.mmap(stream, length, position, prot, flags)
      },
      msync: (stream, buffer, offset, length, mmapFlags) => {
        if (!stream.stream_ops.msync) {
          return 0
        }
        return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags)
      },
      munmap: (stream) => 0,
      ioctl: (stream, cmd, arg) => {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(59)
        }
        return stream.stream_ops.ioctl(stream, cmd, arg)
      },
      readFile: (path, opts = {}) => {
        opts.flags = opts.flags || 0
        opts.encoding = opts.encoding || 'binary'
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"')
        }
        var ret
        var stream = FS.open(path, opts.flags)
        var stat = FS.stat(path)
        var length = stat.size
        var buf = new Uint8Array(length)
        FS.read(stream, buf, 0, length, 0)
        if (opts.encoding === 'utf8') {
          ret = UTF8ArrayToString(buf, 0)
        } else if (opts.encoding === 'binary') {
          ret = buf
        }
        FS.close(stream)
        return ret
      },
      writeFile: (path, data, opts = {}) => {
        opts.flags = opts.flags || 577
        var stream = FS.open(path, opts.flags, opts.mode)
        if (typeof data == 'string') {
          var buf = new Uint8Array(lengthBytesUTF8(data) + 1)
          var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length)
          FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn)
        } else if (ArrayBuffer.isView(data)) {
          FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn)
        } else {
          throw new Error('Unsupported data type')
        }
        FS.close(stream)
      },
      cwd: () => FS.currentPath,
      chdir: (path) => {
        var lookup = FS.lookupPath(path, { follow: true })
        if (lookup.node === null) {
          throw new FS.ErrnoError(44)
        }
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(54)
        }
        var errCode = FS.nodePermissions(lookup.node, 'x')
        if (errCode) {
          throw new FS.ErrnoError(errCode)
        }
        FS.currentPath = lookup.path
      },
      createDefaultDirectories: () => {
        FS.mkdir('/tmp')
        FS.mkdir('/home')
        FS.mkdir('/home/web_user')
      },
      createDefaultDevices: () => {
        FS.mkdir('/dev')
        FS.registerDevice(FS.makedev(1, 3), { read: () => 0, write: (stream, buffer, offset, length, pos) => length })
        FS.mkdev('/dev/null', FS.makedev(1, 3))
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops)
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops)
        FS.mkdev('/dev/tty', FS.makedev(5, 0))
        FS.mkdev('/dev/tty1', FS.makedev(6, 0))
        var random_device = getRandomDevice()
        FS.createDevice('/dev', 'random', random_device)
        FS.createDevice('/dev', 'urandom', random_device)
        FS.mkdir('/dev/shm')
        FS.mkdir('/dev/shm/tmp')
      },
      createSpecialDirectories: () => {
        FS.mkdir('/proc')
        var proc_self = FS.mkdir('/proc/self')
        FS.mkdir('/proc/self/fd')
        FS.mount(
          {
            mount: () => {
              var node = FS.createNode(proc_self, 'fd', 16384 | 511, 73)
              node.node_ops = {
                lookup: (parent, name) => {
                  var fd = +name
                  var stream = FS.getStream(fd)
                  if (!stream) throw new FS.ErrnoError(8)
                  var ret = { parent: null, mount: { mountpoint: 'fake' }, node_ops: { readlink: () => stream.path } }
                  ret.parent = ret
                  return ret
                }
              }
              return node
            }
          },
          {},
          '/proc/self/fd'
        )
      },
      createStandardStreams: () => {
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin'])
        } else {
          FS.symlink('/dev/tty', '/dev/stdin')
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout'])
        } else {
          FS.symlink('/dev/tty', '/dev/stdout')
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr'])
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr')
        }
        var stdin = FS.open('/dev/stdin', 0)
        var stdout = FS.open('/dev/stdout', 1)
        var stderr = FS.open('/dev/stderr', 1)
      },
      ensureErrnoError: () => {
        if (FS.ErrnoError) return
        FS.ErrnoError = function ErrnoError(errno, node) {
          this.node = node
          this.setErrno = function (errno) {
            this.errno = errno
          }
          this.setErrno(errno)
          this.message = 'FS error'
        }
        FS.ErrnoError.prototype = new Error()
        FS.ErrnoError.prototype.constructor = FS.ErrnoError
        ;[44].forEach((code) => {
          FS.genericErrors[code] = new FS.ErrnoError(code)
          FS.genericErrors[code].stack = '<generic error, no stack>'
        })
      },
      staticInit: () => {
        FS.ensureErrnoError()
        FS.nameTable = new Array(4096)
        FS.mount(MEMFS, {}, '/')
        FS.createDefaultDirectories()
        FS.createDefaultDevices()
        FS.createSpecialDirectories()
        FS.filesystems = { MEMFS: MEMFS }
      },
      init: (input, output, error) => {
        FS.init.initialized = true
        FS.ensureErrnoError()
        Module['stdin'] = input || Module['stdin']
        Module['stdout'] = output || Module['stdout']
        Module['stderr'] = error || Module['stderr']
        FS.createStandardStreams()
      },
      quit: () => {
        FS.init.initialized = false
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i]
          if (!stream) {
            continue
          }
          FS.close(stream)
        }
      },
      getMode: (canRead, canWrite) => {
        var mode = 0
        if (canRead) mode |= 292 | 73
        if (canWrite) mode |= 146
        return mode
      },
      findObject: (path, dontResolveLastLink) => {
        var ret = FS.analyzePath(path, dontResolveLastLink)
        if (!ret.exists) {
          return null
        }
        return ret.object
      },
      analyzePath: (path, dontResolveLastLink) => {
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink })
          path = lookup.path
        } catch (e) {}
        var ret = {
          isRoot: false,
          exists: false,
          error: 0,
          name: null,
          path: null,
          object: null,
          parentExists: false,
          parentPath: null,
          parentObject: null
        }
        try {
          var lookup = FS.lookupPath(path, { parent: true })
          ret.parentExists = true
          ret.parentPath = lookup.path
          ret.parentObject = lookup.node
          ret.name = PATH.basename(path)
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink })
          ret.exists = true
          ret.path = lookup.path
          ret.object = lookup.node
          ret.name = lookup.node.name
          ret.isRoot = lookup.path === '/'
        } catch (e) {
          ret.error = e.errno
        }
        return ret
      },
      createPath: (parent, path, canRead, canWrite) => {
        parent = typeof parent == 'string' ? parent : FS.getPath(parent)
        var parts = path.split('/').reverse()
        while (parts.length) {
          var part = parts.pop()
          if (!part) continue
          var current = PATH.join2(parent, part)
          try {
            FS.mkdir(current)
          } catch (e) {}
          parent = current
        }
        return current
      },
      createFile: (parent, name, properties, canRead, canWrite) => {
        var path = PATH.join2(typeof parent == 'string' ? parent : FS.getPath(parent), name)
        var mode = FS.getMode(canRead, canWrite)
        return FS.create(path, mode)
      },
      createDataFile: (parent, name, data, canRead, canWrite, canOwn) => {
        var path = name
        if (parent) {
          parent = typeof parent == 'string' ? parent : FS.getPath(parent)
          path = name ? PATH.join2(parent, name) : parent
        }
        var mode = FS.getMode(canRead, canWrite)
        var node = FS.create(path, mode)
        if (data) {
          if (typeof data == 'string') {
            var arr = new Array(data.length)
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i)
            data = arr
          }
          FS.chmod(node, mode | 146)
          var stream = FS.open(node, 577)
          FS.write(stream, data, 0, data.length, 0, canOwn)
          FS.close(stream)
          FS.chmod(node, mode)
        }
        return node
      },
      createDevice: (parent, name, input, output) => {
        var path = PATH.join2(typeof parent == 'string' ? parent : FS.getPath(parent), name)
        var mode = FS.getMode(!!input, !!output)
        if (!FS.createDevice.major) FS.createDevice.major = 64
        var dev = FS.makedev(FS.createDevice.major++, 0)
        FS.registerDevice(dev, {
          open: (stream) => {
            stream.seekable = false
          },
          close: (stream) => {
            if (output && output.buffer && output.buffer.length) {
              output(10)
            }
          },
          read: (stream, buffer, offset, length, pos) => {
            var bytesRead = 0
            for (var i = 0; i < length; i++) {
              var result
              try {
                result = input()
              } catch (e) {
                throw new FS.ErrnoError(29)
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(6)
              }
              if (result === null || result === undefined) break
              bytesRead++
              buffer[offset + i] = result
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now()
            }
            return bytesRead
          },
          write: (stream, buffer, offset, length, pos) => {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset + i])
              } catch (e) {
                throw new FS.ErrnoError(29)
              }
            }
            if (length) {
              stream.node.timestamp = Date.now()
            }
            return i
          }
        })
        return FS.mkdev(path, mode, dev)
      },
      forceLoadFile: (obj) => {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true
        if (typeof XMLHttpRequest != 'undefined') {
          throw new Error(
            'Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.'
          )
        } else if (read_) {
          try {
            obj.contents = intArrayFromString(read_(obj.url), true)
            obj.usedBytes = obj.contents.length
          } catch (e) {
            throw new FS.ErrnoError(29)
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.')
        }
      },
      createLazyFile: (parent, name, url, canRead, canWrite) => {
        function LazyUint8Array() {
          this.lengthKnown = false
          this.chunks = []
        }
        LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
          if (idx > this.length - 1 || idx < 0) {
            return undefined
          }
          var chunkOffset = idx % this.chunkSize
          var chunkNum = (idx / this.chunkSize) | 0
          return this.getter(chunkNum)[chunkOffset]
        }
        LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
          this.getter = getter
        }
        LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
          var xhr = new XMLHttpRequest()
          xhr.open('HEAD', url, false)
          xhr.send(null)
          if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304))
            throw new Error("Couldn't load " + url + '. Status: ' + xhr.status)
          var datalength = Number(xhr.getResponseHeader('Content-length'))
          var header
          var hasByteServing = (header = xhr.getResponseHeader('Accept-Ranges')) && header === 'bytes'
          var usesGzip = (header = xhr.getResponseHeader('Content-Encoding')) && header === 'gzip'
          var chunkSize = 1024 * 1024
          if (!hasByteServing) chunkSize = datalength
          var doXHR = (from, to) => {
            if (from > to) throw new Error('invalid range (' + from + ', ' + to + ') or no bytes requested!')
            if (to > datalength - 1) throw new Error('only ' + datalength + ' bytes available! programmer error!')
            var xhr = new XMLHttpRequest()
            xhr.open('GET', url, false)
            if (datalength !== chunkSize) xhr.setRequestHeader('Range', 'bytes=' + from + '-' + to)
            xhr.responseType = 'arraybuffer'
            if (xhr.overrideMimeType) {
              xhr.overrideMimeType('text/plain; charset=x-user-defined')
            }
            xhr.send(null)
            if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304))
              throw new Error("Couldn't load " + url + '. Status: ' + xhr.status)
            if (xhr.response !== undefined) {
              return new Uint8Array(xhr.response || [])
            }
            return intArrayFromString(xhr.responseText || '', true)
          }
          var lazyArray = this
          lazyArray.setDataGetter((chunkNum) => {
            var start = chunkNum * chunkSize
            var end = (chunkNum + 1) * chunkSize - 1
            end = Math.min(end, datalength - 1)
            if (typeof lazyArray.chunks[chunkNum] == 'undefined') {
              lazyArray.chunks[chunkNum] = doXHR(start, end)
            }
            if (typeof lazyArray.chunks[chunkNum] == 'undefined') throw new Error('doXHR failed!')
            return lazyArray.chunks[chunkNum]
          })
          if (usesGzip || !datalength) {
            chunkSize = datalength = 1
            datalength = this.getter(0).length
            chunkSize = datalength
            out('LazyFiles on gzip forces download of the whole file when length is accessed')
          }
          this._length = datalength
          this._chunkSize = chunkSize
          this.lengthKnown = true
        }
        if (typeof XMLHttpRequest != 'undefined') {
          if (!ENVIRONMENT_IS_WORKER)
            throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc'
          var lazyArray = new LazyUint8Array()
          Object.defineProperties(lazyArray, {
            length: {
              get: function () {
                if (!this.lengthKnown) {
                  this.cacheLength()
                }
                return this._length
              }
            },
            chunkSize: {
              get: function () {
                if (!this.lengthKnown) {
                  this.cacheLength()
                }
                return this._chunkSize
              }
            }
          })
          var properties = { isDevice: false, contents: lazyArray }
        } else {
          var properties = { isDevice: false, url: url }
        }
        var node = FS.createFile(parent, name, properties, canRead, canWrite)
        if (properties.contents) {
          node.contents = properties.contents
        } else if (properties.url) {
          node.contents = null
          node.url = properties.url
        }
        Object.defineProperties(node, {
          usedBytes: {
            get: function () {
              return this.contents.length
            }
          }
        })
        var stream_ops = {}
        var keys = Object.keys(node.stream_ops)
        keys.forEach((key) => {
          var fn = node.stream_ops[key]
          stream_ops[key] = function forceLoadLazyFile() {
            FS.forceLoadFile(node)
            return fn.apply(null, arguments)
          }
        })
        function writeChunks(stream, buffer, offset, length, position) {
          var contents = stream.node.contents
          if (position >= contents.length) return 0
          var size = Math.min(contents.length - position, length)
          if (contents.slice) {
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i]
            }
          } else {
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents.get(position + i)
            }
          }
          return size
        }
        stream_ops.read = (stream, buffer, offset, length, position) => {
          FS.forceLoadFile(node)
          return writeChunks(stream, buffer, offset, length, position)
        }
        stream_ops.mmap = (stream, length, position, prot, flags) => {
          FS.forceLoadFile(node)
          var ptr = mmapAlloc(length)
          if (!ptr) {
            throw new FS.ErrnoError(48)
          }
          writeChunks(stream, HEAP8, ptr, length, position)
          return { ptr: ptr, allocated: true }
        }
        node.stream_ops = stream_ops
        return node
      },
      createPreloadedFile: (
        parent,
        name,
        url,
        canRead,
        canWrite,
        onload,
        onerror,
        dontCreateFile,
        canOwn,
        preFinish
      ) => {
        var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent
        var dep = getUniqueRunDependency('cp ' + fullname)
        function processData(byteArray) {
          function finish(byteArray) {
            if (preFinish) preFinish()
            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn)
            }
            if (onload) onload()
            removeRunDependency(dep)
          }
          if (
            Browser.handledByPreloadPlugin(byteArray, fullname, finish, () => {
              if (onerror) onerror()
              removeRunDependency(dep)
            })
          ) {
            return
          }
          finish(byteArray)
        }
        addRunDependency(dep)
        if (typeof url == 'string') {
          asyncLoad(url, (byteArray) => processData(byteArray), onerror)
        } else {
          processData(url)
        }
      },
      indexedDB: () => {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
      },
      DB_NAME: () => {
        return 'EM_FS_' + window.location.pathname
      },
      DB_VERSION: 20,
      DB_STORE_NAME: 'FILE_DATA',
      saveFilesToDB: (paths, onload = () => {}, onerror = () => {}) => {
        var indexedDB = FS.indexedDB()
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION)
        } catch (e) {
          return onerror(e)
        }
        openRequest.onupgradeneeded = () => {
          out('creating db')
          var db = openRequest.result
          db.createObjectStore(FS.DB_STORE_NAME)
        }
        openRequest.onsuccess = () => {
          var db = openRequest.result
          var transaction = db.transaction([FS.DB_STORE_NAME], 'readwrite')
          var files = transaction.objectStore(FS.DB_STORE_NAME)
          var ok = 0,
            fail = 0,
            total = paths.length
          function finish() {
            if (fail == 0) onload()
            else onerror()
          }
          paths.forEach((path) => {
            var putRequest = files.put(FS.analyzePath(path).object.contents, path)
            putRequest.onsuccess = () => {
              ok++
              if (ok + fail == total) finish()
            }
            putRequest.onerror = () => {
              fail++
              if (ok + fail == total) finish()
            }
          })
          transaction.onerror = onerror
        }
        openRequest.onerror = onerror
      },
      loadFilesFromDB: (paths, onload = () => {}, onerror = () => {}) => {
        var indexedDB = FS.indexedDB()
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION)
        } catch (e) {
          return onerror(e)
        }
        openRequest.onupgradeneeded = onerror
        openRequest.onsuccess = () => {
          var db = openRequest.result
          try {
            var transaction = db.transaction([FS.DB_STORE_NAME], 'readonly')
          } catch (e) {
            onerror(e)
            return
          }
          var files = transaction.objectStore(FS.DB_STORE_NAME)
          var ok = 0,
            fail = 0,
            total = paths.length
          function finish() {
            if (fail == 0) onload()
            else onerror()
          }
          paths.forEach((path) => {
            var getRequest = files.get(path)
            getRequest.onsuccess = () => {
              if (FS.analyzePath(path).exists) {
                FS.unlink(path)
              }
              FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true)
              ok++
              if (ok + fail == total) finish()
            }
            getRequest.onerror = () => {
              fail++
              if (ok + fail == total) finish()
            }
          })
          transaction.onerror = onerror
        }
        openRequest.onerror = onerror
      }
    }
    var SYSCALLS = {
      DEFAULT_POLLMASK: 5,
      calculateAt: function (dirfd, path, allowEmpty) {
        if (PATH.isAbs(path)) {
          return path
        }
        var dir
        if (dirfd === -100) {
          dir = FS.cwd()
        } else {
          var dirstream = SYSCALLS.getStreamFromFD(dirfd)
          dir = dirstream.path
        }
        if (path.length == 0) {
          if (!allowEmpty) {
            throw new FS.ErrnoError(44)
          }
          return dir
        }
        return PATH.join2(dir, path)
      },
      doStat: function (func, path, buf) {
        try {
          var stat = func(path)
        } catch (e) {
          if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
            return -54
          }
          throw e
        }
        HEAP32[buf >> 2] = stat.dev
        HEAP32[(buf + 8) >> 2] = stat.ino
        HEAP32[(buf + 12) >> 2] = stat.mode
        HEAPU32[(buf + 16) >> 2] = stat.nlink
        HEAP32[(buf + 20) >> 2] = stat.uid
        HEAP32[(buf + 24) >> 2] = stat.gid
        HEAP32[(buf + 28) >> 2] = stat.rdev
        ;(tempI64 = [
          stat.size >>> 0,
          ((tempDouble = stat.size),
          +Math.abs(tempDouble) >= 1
            ? tempDouble > 0
              ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0
              : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0
            : 0)
        ]),
          (HEAP32[(buf + 40) >> 2] = tempI64[0]),
          (HEAP32[(buf + 44) >> 2] = tempI64[1])
        HEAP32[(buf + 48) >> 2] = 4096
        HEAP32[(buf + 52) >> 2] = stat.blocks
        var atime = stat.atime.getTime()
        var mtime = stat.mtime.getTime()
        var ctime = stat.ctime.getTime()
        ;(tempI64 = [
          Math.floor(atime / 1e3) >>> 0,
          ((tempDouble = Math.floor(atime / 1e3)),
          +Math.abs(tempDouble) >= 1
            ? tempDouble > 0
              ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0
              : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0
            : 0)
        ]),
          (HEAP32[(buf + 56) >> 2] = tempI64[0]),
          (HEAP32[(buf + 60) >> 2] = tempI64[1])
        HEAPU32[(buf + 64) >> 2] = (atime % 1e3) * 1e3
        ;(tempI64 = [
          Math.floor(mtime / 1e3) >>> 0,
          ((tempDouble = Math.floor(mtime / 1e3)),
          +Math.abs(tempDouble) >= 1
            ? tempDouble > 0
              ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0
              : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0
            : 0)
        ]),
          (HEAP32[(buf + 72) >> 2] = tempI64[0]),
          (HEAP32[(buf + 76) >> 2] = tempI64[1])
        HEAPU32[(buf + 80) >> 2] = (mtime % 1e3) * 1e3
        ;(tempI64 = [
          Math.floor(ctime / 1e3) >>> 0,
          ((tempDouble = Math.floor(ctime / 1e3)),
          +Math.abs(tempDouble) >= 1
            ? tempDouble > 0
              ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0
              : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0
            : 0)
        ]),
          (HEAP32[(buf + 88) >> 2] = tempI64[0]),
          (HEAP32[(buf + 92) >> 2] = tempI64[1])
        HEAPU32[(buf + 96) >> 2] = (ctime % 1e3) * 1e3
        ;(tempI64 = [
          stat.ino >>> 0,
          ((tempDouble = stat.ino),
          +Math.abs(tempDouble) >= 1
            ? tempDouble > 0
              ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0
              : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0
            : 0)
        ]),
          (HEAP32[(buf + 104) >> 2] = tempI64[0]),
          (HEAP32[(buf + 108) >> 2] = tempI64[1])
        return 0
      },
      doMsync: function (addr, stream, len, flags, offset) {
        if (!FS.isFile(stream.node.mode)) {
          throw new FS.ErrnoError(43)
        }
        if (flags & 2) {
          return 0
        }
        var buffer = HEAPU8.slice(addr, addr + len)
        FS.msync(stream, buffer, offset, len, flags)
      },
      varargs: undefined,
      get: function () {
        SYSCALLS.varargs += 4
        var ret = HEAP32[(SYSCALLS.varargs - 4) >> 2]
        return ret
      },
      getStr: function (ptr) {
        var ret = UTF8ToString(ptr)
        return ret
      },
      getStreamFromFD: function (fd) {
        var stream = FS.getStream(fd)
        if (!stream) throw new FS.ErrnoError(8)
        return stream
      }
    }
    function ___syscall_chmod(path, mode) {
      try {
        path = SYSCALLS.getStr(path)
        FS.chmod(path, mode)
        return 0
      } catch (e) {
        if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e
        return -e.errno
      }
    }
    function ___syscall_faccessat(dirfd, path, amode, flags) {
      try {
        path = SYSCALLS.getStr(path)
        path = SYSCALLS.calculateAt(dirfd, path)
        if (amode & ~7) {
          return -28
        }
        var lookup = FS.lookupPath(path, { follow: true })
        var node = lookup.node
        if (!node) {
          return -44
        }
        var perms = ''
        if (amode & 4) perms += 'r'
        if (amode & 2) perms += 'w'
        if (amode & 1) perms += 'x'
        if (perms && FS.nodePermissions(node, perms)) {
          return -2
        }
        return 0
      } catch (e) {
        if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e
        return -e.errno
      }
    }
    function ___syscall_fchmod(fd, mode) {
      try {
        FS.fchmod(fd, mode)
        return 0
      } catch (e) {
        if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e
        return -e.errno
      }
    }
    function ___syscall_fchown32(fd, owner, group) {
      try {
        FS.fchown(fd, owner, group)
        return 0
      } catch (e) {
        if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e
        return -e.errno
      }
    }
    function setErrNo(value) {
      HEAP32[___errno_location() >> 2] = value
      return value
    }
    function ___syscall_fcntl64(fd, cmd, varargs) {
      SYSCALLS.varargs = varargs
      try {
        var stream = SYSCALLS.getStreamFromFD(fd)
        switch (cmd) {
          case 0: {
            var arg = SYSCALLS.get()
            if (arg < 0) {
              return -28
            }
            var newStream
            newStream = FS.createStream(stream, arg)
            return newStream.fd
          }
          case 1:
          case 2:
            return 0
          case 3:
            return stream.flags
          case 4: {
            var arg = SYSCALLS.get()
            stream.flags |= arg
            return 0
          }
          case 5: {
            var arg = SYSCALLS.get()
            var offset = 0
            HEAP16[(arg + offset) >> 1] = 2
            return 0
          }
          case 6:
          case 7:
            return 0
          case 16:
          case 8:
            return -28
          case 9:
            setErrNo(28)
            return -1
          default: {
            return -28
          }
        }
      } catch (e) {
        if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e
        return -e.errno
      }
    }
    function ___syscall_fstat64(fd, buf) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd)
        return SYSCALLS.doStat(FS.stat, stream.path, buf)
      } catch (e) {
        if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e
        return -e.errno
      }
    }
    function convertI32PairToI53Checked(lo, hi) {
      return (hi + 2097152) >>> 0 < 4194305 - !!lo ? (lo >>> 0) + hi * 4294967296 : NaN
    }
    function ___syscall_ftruncate64(fd, length_low, length_high) {
      try {
        var length = convertI32PairToI53Checked(length_low, length_high)
        if (isNaN(length)) return -61
        FS.ftruncate(fd, length)
        return 0
      } catch (e) {
        if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e
        return -e.errno
      }
    }
    function ___syscall_getcwd(buf, size) {
      try {
        if (size === 0) return -28
        var cwd = FS.cwd()
        var cwdLengthInBytes = lengthBytesUTF8(cwd) + 1
        if (size < cwdLengthInBytes) return -68
        stringToUTF8(cwd, buf, size)
        return cwdLengthInBytes
      } catch (e) {
        if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e
        return -e.errno
      }
    }
    function ___syscall_ioctl(fd, op, varargs) {
      SYSCALLS.varargs = varargs
      try {
        var stream = SYSCALLS.getStreamFromFD(fd)
        switch (op) {
          case 21509:
          case 21505: {
            if (!stream.tty) return -59
            return 0
          }
          case 21510:
          case 21511:
          case 21512:
          case 21506:
          case 21507:
          case 21508: {
            if (!stream.tty) return -59
            return 0
          }
          case 21519: {
            if (!stream.tty) return -59
            var argp = SYSCALLS.get()
            HEAP32[argp >> 2] = 0
            return 0
          }
          case 21520: {
            if (!stream.tty) return -59
            return -28
          }
          case 21531: {
            var argp = SYSCALLS.get()
            return FS.ioctl(stream, op, argp)
          }
          case 21523: {
            if (!stream.tty) return -59
            return 0
          }
          case 21524: {
            if (!stream.tty) return -59
            return 0
          }
          default:
            return -28
        }
      } catch (e) {
        if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e
        return -e.errno
      }
    }
    function ___syscall_lstat64(path, buf) {
      try {
        path = SYSCALLS.getStr(path)
        return SYSCALLS.doStat(FS.lstat, path, buf)
      } catch (e) {
        if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e
        return -e.errno
      }
    }
    function ___syscall_mkdirat(dirfd, path, mode) {
      try {
        path = SYSCALLS.getStr(path)
        path = SYSCALLS.calculateAt(dirfd, path)
        path = PATH.normalize(path)
        if (path[path.length - 1] === '/') path = path.substr(0, path.length - 1)
        FS.mkdir(path, mode, 0)
        return 0
      } catch (e) {
        if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e
        return -e.errno
      }
    }
    function ___syscall_newfstatat(dirfd, path, buf, flags) {
      try {
        path = SYSCALLS.getStr(path)
        var nofollow = flags & 256
        var allowEmpty = flags & 4096
        flags = flags & ~6400
        path = SYSCALLS.calculateAt(dirfd, path, allowEmpty)
        return SYSCALLS.doStat(nofollow ? FS.lstat : FS.stat, path, buf)
      } catch (e) {
        if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e
        return -e.errno
      }
    }
    function ___syscall_openat(dirfd, path, flags, varargs) {
      SYSCALLS.varargs = varargs
      try {
        path = SYSCALLS.getStr(path)
        path = SYSCALLS.calculateAt(dirfd, path)
        var mode = varargs ? SYSCALLS.get() : 0
        return FS.open(path, flags, mode).fd
      } catch (e) {
        if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e
        return -e.errno
      }
    }
    function ___syscall_readlinkat(dirfd, path, buf, bufsize) {
      try {
        path = SYSCALLS.getStr(path)
        path = SYSCALLS.calculateAt(dirfd, path)
        if (bufsize <= 0) return -28
        var ret = FS.readlink(path)
        var len = Math.min(bufsize, lengthBytesUTF8(ret))
        var endChar = HEAP8[buf + len]
        stringToUTF8(ret, buf, bufsize + 1)
        HEAP8[buf + len] = endChar
        return len
      } catch (e) {
        if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e
        return -e.errno
      }
    }
    function ___syscall_rmdir(path) {
      try {
        path = SYSCALLS.getStr(path)
        FS.rmdir(path)
        return 0
      } catch (e) {
        if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e
        return -e.errno
      }
    }
    function ___syscall_stat64(path, buf) {
      try {
        path = SYSCALLS.getStr(path)
        return SYSCALLS.doStat(FS.stat, path, buf)
      } catch (e) {
        if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e
        return -e.errno
      }
    }
    function ___syscall_unlinkat(dirfd, path, flags) {
      try {
        path = SYSCALLS.getStr(path)
        path = SYSCALLS.calculateAt(dirfd, path)
        if (flags === 0) {
          FS.unlink(path)
        } else if (flags === 512) {
          FS.rmdir(path)
        } else {
          abort('Invalid flags passed to unlinkat')
        }
        return 0
      } catch (e) {
        if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e
        return -e.errno
      }
    }
    function readI53FromI64(ptr) {
      return HEAPU32[ptr >> 2] + HEAP32[(ptr + 4) >> 2] * 4294967296
    }
    function ___syscall_utimensat(dirfd, path, times, flags) {
      try {
        path = SYSCALLS.getStr(path)
        path = SYSCALLS.calculateAt(dirfd, path, true)
        if (!times) {
          var atime = Date.now()
          var mtime = atime
        } else {
          var seconds = readI53FromI64(times)
          var nanoseconds = HEAP32[(times + 8) >> 2]
          atime = seconds * 1e3 + nanoseconds / (1e3 * 1e3)
          times += 16
          seconds = readI53FromI64(times)
          nanoseconds = HEAP32[(times + 8) >> 2]
          mtime = seconds * 1e3 + nanoseconds / (1e3 * 1e3)
        }
        FS.utime(path, atime, mtime)
        return 0
      } catch (e) {
        if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e
        return -e.errno
      }
    }
    var tupleRegistrations = {}
    function runDestructors(destructors) {
      while (destructors.length) {
        var ptr = destructors.pop()
        var del = destructors.pop()
        del(ptr)
      }
    }
    function simpleReadValueFromPointer(pointer) {
      return this['fromWireType'](HEAP32[pointer >> 2])
    }
    var awaitingDependencies = {}
    var registeredTypes = {}
    var typeDependencies = {}
    var char_0 = 48
    var char_9 = 57
    function makeLegalFunctionName(name) {
      if (undefined === name) {
        return '_unknown'
      }
      name = name.replace(/[^a-zA-Z0-9_]/g, '$')
      var f = name.charCodeAt(0)
      if (f >= char_0 && f <= char_9) {
        return '_' + name
      }
      return name
    }
    function createNamedFunction(name, body) {
      name = makeLegalFunctionName(name)
      return new Function(
        'body',
        'return function ' +
          name +
          '() {\n' +
          '    "use strict";' +
          '    return body.apply(this, arguments);\n' +
          '};\n'
      )(body)
    }
    function extendError(baseErrorType, errorName) {
      var errorClass = createNamedFunction(errorName, function (message) {
        this.name = errorName
        this.message = message
        var stack = new Error(message).stack
        if (stack !== undefined) {
          this.stack = this.toString() + '\n' + stack.replace(/^Error(:[^\n]*)?\n/, '')
        }
      })
      errorClass.prototype = Object.create(baseErrorType.prototype)
      errorClass.prototype.constructor = errorClass
      errorClass.prototype.toString = function () {
        if (this.message === undefined) {
          return this.name
        } else {
          return this.name + ': ' + this.message
        }
      }
      return errorClass
    }
    var InternalError = undefined
    function throwInternalError(message) {
      throw new InternalError(message)
    }
    function whenDependentTypesAreResolved(myTypes, dependentTypes, getTypeConverters) {
      myTypes.forEach(function (type) {
        typeDependencies[type] = dependentTypes
      })
      function onComplete(typeConverters) {
        var myTypeConverters = getTypeConverters(typeConverters)
        if (myTypeConverters.length !== myTypes.length) {
          throwInternalError('Mismatched type converter count')
        }
        for (var i = 0; i < myTypes.length; ++i) {
          registerType(myTypes[i], myTypeConverters[i])
        }
      }
      var typeConverters = new Array(dependentTypes.length)
      var unregisteredTypes = []
      var registered = 0
      dependentTypes.forEach((dt, i) => {
        if (registeredTypes.hasOwnProperty(dt)) {
          typeConverters[i] = registeredTypes[dt]
        } else {
          unregisteredTypes.push(dt)
          if (!awaitingDependencies.hasOwnProperty(dt)) {
            awaitingDependencies[dt] = []
          }
          awaitingDependencies[dt].push(() => {
            typeConverters[i] = registeredTypes[dt]
            ++registered
            if (registered === unregisteredTypes.length) {
              onComplete(typeConverters)
            }
          })
        }
      })
      if (0 === unregisteredTypes.length) {
        onComplete(typeConverters)
      }
    }
    function __embind_finalize_value_array(rawTupleType) {
      var reg = tupleRegistrations[rawTupleType]
      delete tupleRegistrations[rawTupleType]
      var elements = reg.elements
      var elementsLength = elements.length
      var elementTypes = elements
        .map(function (elt) {
          return elt.getterReturnType
        })
        .concat(
          elements.map(function (elt) {
            return elt.setterArgumentType
          })
        )
      var rawConstructor = reg.rawConstructor
      var rawDestructor = reg.rawDestructor
      whenDependentTypesAreResolved([rawTupleType], elementTypes, function (elementTypes) {
        elements.forEach((elt, i) => {
          var getterReturnType = elementTypes[i]
          var getter = elt.getter
          var getterContext = elt.getterContext
          var setterArgumentType = elementTypes[i + elementsLength]
          var setter = elt.setter
          var setterContext = elt.setterContext
          elt.read = (ptr) => {
            return getterReturnType['fromWireType'](getter(getterContext, ptr))
          }
          elt.write = (ptr, o) => {
            var destructors = []
            setter(setterContext, ptr, setterArgumentType['toWireType'](destructors, o))
            runDestructors(destructors)
          }
        })
        return [
          {
            name: reg.name,
            fromWireType: function (ptr) {
              var rv = new Array(elementsLength)
              for (var i = 0; i < elementsLength; ++i) {
                rv[i] = elements[i].read(ptr)
              }
              rawDestructor(ptr)
              return rv
            },
            toWireType: function (destructors, o) {
              if (elementsLength !== o.length) {
                throw new TypeError(
                  'Incorrect number of tuple elements for ' +
                    reg.name +
                    ': expected=' +
                    elementsLength +
                    ', actual=' +
                    o.length
                )
              }
              var ptr = rawConstructor()
              for (var i = 0; i < elementsLength; ++i) {
                elements[i].write(ptr, o[i])
              }
              if (destructors !== null) {
                destructors.push(rawDestructor, ptr)
              }
              return ptr
            },
            argPackAdvance: 8,
            readValueFromPointer: simpleReadValueFromPointer,
            destructorFunction: rawDestructor
          }
        ]
      })
    }
    var structRegistrations = {}
    function __embind_finalize_value_object(structType) {
      var reg = structRegistrations[structType]
      delete structRegistrations[structType]
      var rawConstructor = reg.rawConstructor
      var rawDestructor = reg.rawDestructor
      var fieldRecords = reg.fields
      var fieldTypes = fieldRecords
        .map((field) => field.getterReturnType)
        .concat(fieldRecords.map((field) => field.setterArgumentType))
      whenDependentTypesAreResolved([structType], fieldTypes, (fieldTypes) => {
        var fields = {}
        fieldRecords.forEach((field, i) => {
          var fieldName = field.fieldName
          var getterReturnType = fieldTypes[i]
          var getter = field.getter
          var getterContext = field.getterContext
          var setterArgumentType = fieldTypes[i + fieldRecords.length]
          var setter = field.setter
          var setterContext = field.setterContext
          fields[fieldName] = {
            read: (ptr) => {
              return getterReturnType['fromWireType'](getter(getterContext, ptr))
            },
            write: (ptr, o) => {
              var destructors = []
              setter(setterContext, ptr, setterArgumentType['toWireType'](destructors, o))
              runDestructors(destructors)
            }
          }
        })
        return [
          {
            name: reg.name,
            fromWireType: function (ptr) {
              var rv = {}
              for (var i in fields) {
                rv[i] = fields[i].read(ptr)
              }
              rawDestructor(ptr)
              return rv
            },
            toWireType: function (destructors, o) {
              for (var fieldName in fields) {
                if (!(fieldName in o)) {
                  throw new TypeError('Missing field:  "' + fieldName + '"')
                }
              }
              var ptr = rawConstructor()
              for (fieldName in fields) {
                fields[fieldName].write(ptr, o[fieldName])
              }
              if (destructors !== null) {
                destructors.push(rawDestructor, ptr)
              }
              return ptr
            },
            argPackAdvance: 8,
            readValueFromPointer: simpleReadValueFromPointer,
            destructorFunction: rawDestructor
          }
        ]
      })
    }
    function __embind_register_bigint(primitiveType, name, size, minRange, maxRange) {}
    function getShiftFromSize(size) {
      switch (size) {
        case 1:
          return 0
        case 2:
          return 1
        case 4:
          return 2
        case 8:
          return 3
        default:
          throw new TypeError('Unknown type size: ' + size)
      }
    }
    function embind_init_charCodes() {
      var codes = new Array(256)
      for (var i = 0; i < 256; ++i) {
        codes[i] = String.fromCharCode(i)
      }
      embind_charCodes = codes
    }
    var embind_charCodes = undefined
    function readLatin1String(ptr) {
      var ret = ''
      var c = ptr
      while (HEAPU8[c]) {
        ret += embind_charCodes[HEAPU8[c++]]
      }
      return ret
    }
    var BindingError = undefined
    function throwBindingError(message) {
      throw new BindingError(message)
    }
    function registerType(rawType, registeredInstance, options = {}) {
      if (!('argPackAdvance' in registeredInstance)) {
        throw new TypeError('registerType registeredInstance requires argPackAdvance')
      }
      var name = registeredInstance.name
      if (!rawType) {
        throwBindingError('type "' + name + '" must have a positive integer typeid pointer')
      }
      if (registeredTypes.hasOwnProperty(rawType)) {
        if (options.ignoreDuplicateRegistrations) {
          return
        } else {
          throwBindingError("Cannot register type '" + name + "' twice")
        }
      }
      registeredTypes[rawType] = registeredInstance
      delete typeDependencies[rawType]
      if (awaitingDependencies.hasOwnProperty(rawType)) {
        var callbacks = awaitingDependencies[rawType]
        delete awaitingDependencies[rawType]
        callbacks.forEach((cb) => cb())
      }
    }
    function __embind_register_bool(rawType, name, size, trueValue, falseValue) {
      var shift = getShiftFromSize(size)
      name = readLatin1String(name)
      registerType(rawType, {
        name: name,
        fromWireType: function (wt) {
          return !!wt
        },
        toWireType: function (destructors, o) {
          return o ? trueValue : falseValue
        },
        argPackAdvance: 8,
        readValueFromPointer: function (pointer) {
          var heap
          if (size === 1) {
            heap = HEAP8
          } else if (size === 2) {
            heap = HEAP16
          } else if (size === 4) {
            heap = HEAP32
          } else {
            throw new TypeError('Unknown boolean type size: ' + name)
          }
          return this['fromWireType'](heap[pointer >> shift])
        },
        destructorFunction: null
      })
    }
    function ClassHandle_isAliasOf(other) {
      if (!(this instanceof ClassHandle)) {
        return false
      }
      if (!(other instanceof ClassHandle)) {
        return false
      }
      var leftClass = this.$$.ptrType.registeredClass
      var left = this.$$.ptr
      var rightClass = other.$$.ptrType.registeredClass
      var right = other.$$.ptr
      while (leftClass.baseClass) {
        left = leftClass.upcast(left)
        leftClass = leftClass.baseClass
      }
      while (rightClass.baseClass) {
        right = rightClass.upcast(right)
        rightClass = rightClass.baseClass
      }
      return leftClass === rightClass && left === right
    }
    function shallowCopyInternalPointer(o) {
      return {
        count: o.count,
        deleteScheduled: o.deleteScheduled,
        preservePointerOnDelete: o.preservePointerOnDelete,
        ptr: o.ptr,
        ptrType: o.ptrType,
        smartPtr: o.smartPtr,
        smartPtrType: o.smartPtrType
      }
    }
    function throwInstanceAlreadyDeleted(obj) {
      function getInstanceTypeName(handle) {
        return handle.$$.ptrType.registeredClass.name
      }
      throwBindingError(getInstanceTypeName(obj) + ' instance already deleted')
    }
    var finalizationRegistry = false
    function detachFinalizer(handle) {}
    function runDestructor($$) {
      if ($$.smartPtr) {
        $$.smartPtrType.rawDestructor($$.smartPtr)
      } else {
        $$.ptrType.registeredClass.rawDestructor($$.ptr)
      }
    }
    function releaseClassHandle($$) {
      $$.count.value -= 1
      var toDelete = 0 === $$.count.value
      if (toDelete) {
        runDestructor($$)
      }
    }
    function downcastPointer(ptr, ptrClass, desiredClass) {
      if (ptrClass === desiredClass) {
        return ptr
      }
      if (undefined === desiredClass.baseClass) {
        return null
      }
      var rv = downcastPointer(ptr, ptrClass, desiredClass.baseClass)
      if (rv === null) {
        return null
      }
      return desiredClass.downcast(rv)
    }
    var registeredPointers = {}
    function getInheritedInstanceCount() {
      return Object.keys(registeredInstances).length
    }
    function getLiveInheritedInstances() {
      var rv = []
      for (var k in registeredInstances) {
        if (registeredInstances.hasOwnProperty(k)) {
          rv.push(registeredInstances[k])
        }
      }
      return rv
    }
    var deletionQueue = []
    function flushPendingDeletes() {
      while (deletionQueue.length) {
        var obj = deletionQueue.pop()
        obj.$$.deleteScheduled = false
        obj['delete']()
      }
    }
    var delayFunction = undefined
    function setDelayFunction(fn) {
      delayFunction = fn
      if (deletionQueue.length && delayFunction) {
        delayFunction(flushPendingDeletes)
      }
    }
    function init_embind() {
      Module['getInheritedInstanceCount'] = getInheritedInstanceCount
      Module['getLiveInheritedInstances'] = getLiveInheritedInstances
      Module['flushPendingDeletes'] = flushPendingDeletes
      Module['setDelayFunction'] = setDelayFunction
    }
    var registeredInstances = {}
    function getBasestPointer(class_, ptr) {
      if (ptr === undefined) {
        throwBindingError('ptr should not be undefined')
      }
      while (class_.baseClass) {
        ptr = class_.upcast(ptr)
        class_ = class_.baseClass
      }
      return ptr
    }
    function getInheritedInstance(class_, ptr) {
      ptr = getBasestPointer(class_, ptr)
      return registeredInstances[ptr]
    }
    function makeClassHandle(prototype, record) {
      if (!record.ptrType || !record.ptr) {
        throwInternalError('makeClassHandle requires ptr and ptrType')
      }
      var hasSmartPtrType = !!record.smartPtrType
      var hasSmartPtr = !!record.smartPtr
      if (hasSmartPtrType !== hasSmartPtr) {
        throwInternalError('Both smartPtrType and smartPtr must be specified')
      }
      record.count = { value: 1 }
      return attachFinalizer(Object.create(prototype, { $$: { value: record } }))
    }
    function RegisteredPointer_fromWireType(ptr) {
      var rawPointer = this.getPointee(ptr)
      if (!rawPointer) {
        this.destructor(ptr)
        return null
      }
      var registeredInstance = getInheritedInstance(this.registeredClass, rawPointer)
      if (undefined !== registeredInstance) {
        if (0 === registeredInstance.$$.count.value) {
          registeredInstance.$$.ptr = rawPointer
          registeredInstance.$$.smartPtr = ptr
          return registeredInstance['clone']()
        } else {
          var rv = registeredInstance['clone']()
          this.destructor(ptr)
          return rv
        }
      }
      function makeDefaultHandle() {
        if (this.isSmartPointer) {
          return makeClassHandle(this.registeredClass.instancePrototype, {
            ptrType: this.pointeeType,
            ptr: rawPointer,
            smartPtrType: this,
            smartPtr: ptr
          })
        } else {
          return makeClassHandle(this.registeredClass.instancePrototype, { ptrType: this, ptr: ptr })
        }
      }
      var actualType = this.registeredClass.getActualType(rawPointer)
      var registeredPointerRecord = registeredPointers[actualType]
      if (!registeredPointerRecord) {
        return makeDefaultHandle.call(this)
      }
      var toType
      if (this.isConst) {
        toType = registeredPointerRecord.constPointerType
      } else {
        toType = registeredPointerRecord.pointerType
      }
      var dp = downcastPointer(rawPointer, this.registeredClass, toType.registeredClass)
      if (dp === null) {
        return makeDefaultHandle.call(this)
      }
      if (this.isSmartPointer) {
        return makeClassHandle(toType.registeredClass.instancePrototype, {
          ptrType: toType,
          ptr: dp,
          smartPtrType: this,
          smartPtr: ptr
        })
      } else {
        return makeClassHandle(toType.registeredClass.instancePrototype, { ptrType: toType, ptr: dp })
      }
    }
    function attachFinalizer(handle) {
      if ('undefined' === typeof FinalizationRegistry) {
        attachFinalizer = (handle) => handle
        return handle
      }
      finalizationRegistry = new FinalizationRegistry((info) => {
        releaseClassHandle(info.$$)
      })
      attachFinalizer = (handle) => {
        var $$ = handle.$$
        var hasSmartPtr = !!$$.smartPtr
        if (hasSmartPtr) {
          var info = { $$: $$ }
          finalizationRegistry.register(handle, info, handle)
        }
        return handle
      }
      detachFinalizer = (handle) => finalizationRegistry.unregister(handle)
      return attachFinalizer(handle)
    }
    function ClassHandle_clone() {
      if (!this.$$.ptr) {
        throwInstanceAlreadyDeleted(this)
      }
      if (this.$$.preservePointerOnDelete) {
        this.$$.count.value += 1
        return this
      } else {
        var clone = attachFinalizer(
          Object.create(Object.getPrototypeOf(this), { $$: { value: shallowCopyInternalPointer(this.$$) } })
        )
        clone.$$.count.value += 1
        clone.$$.deleteScheduled = false
        return clone
      }
    }
    function ClassHandle_delete() {
      if (!this.$$.ptr) {
        throwInstanceAlreadyDeleted(this)
      }
      if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
        throwBindingError('Object already scheduled for deletion')
      }
      detachFinalizer(this)
      releaseClassHandle(this.$$)
      if (!this.$$.preservePointerOnDelete) {
        this.$$.smartPtr = undefined
        this.$$.ptr = undefined
      }
    }
    function ClassHandle_isDeleted() {
      return !this.$$.ptr
    }
    function ClassHandle_deleteLater() {
      if (!this.$$.ptr) {
        throwInstanceAlreadyDeleted(this)
      }
      if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
        throwBindingError('Object already scheduled for deletion')
      }
      deletionQueue.push(this)
      if (deletionQueue.length === 1 && delayFunction) {
        delayFunction(flushPendingDeletes)
      }
      this.$$.deleteScheduled = true
      return this
    }
    function init_ClassHandle() {
      ClassHandle.prototype['isAliasOf'] = ClassHandle_isAliasOf
      ClassHandle.prototype['clone'] = ClassHandle_clone
      ClassHandle.prototype['delete'] = ClassHandle_delete
      ClassHandle.prototype['isDeleted'] = ClassHandle_isDeleted
      ClassHandle.prototype['deleteLater'] = ClassHandle_deleteLater
    }
    function ClassHandle() {}
    function ensureOverloadTable(proto, methodName, humanName) {
      if (undefined === proto[methodName].overloadTable) {
        var prevFunc = proto[methodName]
        proto[methodName] = function () {
          if (!proto[methodName].overloadTable.hasOwnProperty(arguments.length)) {
            throwBindingError(
              "Function '" +
                humanName +
                "' called with an invalid number of arguments (" +
                arguments.length +
                ') - expects one of (' +
                proto[methodName].overloadTable +
                ')!'
            )
          }
          return proto[methodName].overloadTable[arguments.length].apply(this, arguments)
        }
        proto[methodName].overloadTable = []
        proto[methodName].overloadTable[prevFunc.argCount] = prevFunc
      }
    }
    function exposePublicSymbol(name, value, numArguments) {
      if (Module.hasOwnProperty(name)) {
        if (
          undefined === numArguments ||
          (undefined !== Module[name].overloadTable && undefined !== Module[name].overloadTable[numArguments])
        ) {
          throwBindingError("Cannot register public name '" + name + "' twice")
        }
        ensureOverloadTable(Module, name, name)
        if (Module.hasOwnProperty(numArguments)) {
          throwBindingError(
            'Cannot register multiple overloads of a function with the same number of arguments (' + numArguments + ')!'
          )
        }
        Module[name].overloadTable[numArguments] = value
      } else {
        Module[name] = value
        if (undefined !== numArguments) {
          Module[name].numArguments = numArguments
        }
      }
    }
    function RegisteredClass(
      name,
      constructor,
      instancePrototype,
      rawDestructor,
      baseClass,
      getActualType,
      upcast,
      downcast
    ) {
      this.name = name
      this.constructor = constructor
      this.instancePrototype = instancePrototype
      this.rawDestructor = rawDestructor
      this.baseClass = baseClass
      this.getActualType = getActualType
      this.upcast = upcast
      this.downcast = downcast
      this.pureVirtualFunctions = []
    }
    function upcastPointer(ptr, ptrClass, desiredClass) {
      while (ptrClass !== desiredClass) {
        if (!ptrClass.upcast) {
          throwBindingError(
            'Expected null or instance of ' + desiredClass.name + ', got an instance of ' + ptrClass.name
          )
        }
        ptr = ptrClass.upcast(ptr)
        ptrClass = ptrClass.baseClass
      }
      return ptr
    }
    function constNoSmartPtrRawPointerToWireType(destructors, handle) {
      if (handle === null) {
        if (this.isReference) {
          throwBindingError('null is not a valid ' + this.name)
        }
        return 0
      }
      if (!handle.$$) {
        throwBindingError('Cannot pass "' + embindRepr(handle) + '" as a ' + this.name)
      }
      if (!handle.$$.ptr) {
        throwBindingError('Cannot pass deleted object as a pointer of type ' + this.name)
      }
      var handleClass = handle.$$.ptrType.registeredClass
      var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass)
      return ptr
    }
    function genericPointerToWireType(destructors, handle) {
      var ptr
      if (handle === null) {
        if (this.isReference) {
          throwBindingError('null is not a valid ' + this.name)
        }
        if (this.isSmartPointer) {
          ptr = this.rawConstructor()
          if (destructors !== null) {
            destructors.push(this.rawDestructor, ptr)
          }
          return ptr
        } else {
          return 0
        }
      }
      if (!handle.$$) {
        throwBindingError('Cannot pass "' + embindRepr(handle) + '" as a ' + this.name)
      }
      if (!handle.$$.ptr) {
        throwBindingError('Cannot pass deleted object as a pointer of type ' + this.name)
      }
      if (!this.isConst && handle.$$.ptrType.isConst) {
        throwBindingError(
          'Cannot convert argument of type ' +
            (handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name) +
            ' to parameter type ' +
            this.name
        )
      }
      var handleClass = handle.$$.ptrType.registeredClass
      ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass)
      if (this.isSmartPointer) {
        if (undefined === handle.$$.smartPtr) {
          throwBindingError('Passing raw pointer to smart pointer is illegal')
        }
        switch (this.sharingPolicy) {
          case 0:
            if (handle.$$.smartPtrType === this) {
              ptr = handle.$$.smartPtr
            } else {
              throwBindingError(
                'Cannot convert argument of type ' +
                  (handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name) +
                  ' to parameter type ' +
                  this.name
              )
            }
            break
          case 1:
            ptr = handle.$$.smartPtr
            break
          case 2:
            if (handle.$$.smartPtrType === this) {
              ptr = handle.$$.smartPtr
            } else {
              var clonedHandle = handle['clone']()
              ptr = this.rawShare(
                ptr,
                Emval.toHandle(function () {
                  clonedHandle['delete']()
                })
              )
              if (destructors !== null) {
                destructors.push(this.rawDestructor, ptr)
              }
            }
            break
          default:
            throwBindingError('Unsupporting sharing policy')
        }
      }
      return ptr
    }
    function nonConstNoSmartPtrRawPointerToWireType(destructors, handle) {
      if (handle === null) {
        if (this.isReference) {
          throwBindingError('null is not a valid ' + this.name)
        }
        return 0
      }
      if (!handle.$$) {
        throwBindingError('Cannot pass "' + embindRepr(handle) + '" as a ' + this.name)
      }
      if (!handle.$$.ptr) {
        throwBindingError('Cannot pass deleted object as a pointer of type ' + this.name)
      }
      if (handle.$$.ptrType.isConst) {
        throwBindingError(
          'Cannot convert argument of type ' + handle.$$.ptrType.name + ' to parameter type ' + this.name
        )
      }
      var handleClass = handle.$$.ptrType.registeredClass
      var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass)
      return ptr
    }
    function RegisteredPointer_getPointee(ptr) {
      if (this.rawGetPointee) {
        ptr = this.rawGetPointee(ptr)
      }
      return ptr
    }
    function RegisteredPointer_destructor(ptr) {
      if (this.rawDestructor) {
        this.rawDestructor(ptr)
      }
    }
    function RegisteredPointer_deleteObject(handle) {
      if (handle !== null) {
        handle['delete']()
      }
    }
    function init_RegisteredPointer() {
      RegisteredPointer.prototype.getPointee = RegisteredPointer_getPointee
      RegisteredPointer.prototype.destructor = RegisteredPointer_destructor
      RegisteredPointer.prototype['argPackAdvance'] = 8
      RegisteredPointer.prototype['readValueFromPointer'] = simpleReadValueFromPointer
      RegisteredPointer.prototype['deleteObject'] = RegisteredPointer_deleteObject
      RegisteredPointer.prototype['fromWireType'] = RegisteredPointer_fromWireType
    }
    function RegisteredPointer(
      name,
      registeredClass,
      isReference,
      isConst,
      isSmartPointer,
      pointeeType,
      sharingPolicy,
      rawGetPointee,
      rawConstructor,
      rawShare,
      rawDestructor
    ) {
      this.name = name
      this.registeredClass = registeredClass
      this.isReference = isReference
      this.isConst = isConst
      this.isSmartPointer = isSmartPointer
      this.pointeeType = pointeeType
      this.sharingPolicy = sharingPolicy
      this.rawGetPointee = rawGetPointee
      this.rawConstructor = rawConstructor
      this.rawShare = rawShare
      this.rawDestructor = rawDestructor
      if (!isSmartPointer && registeredClass.baseClass === undefined) {
        if (isConst) {
          this['toWireType'] = constNoSmartPtrRawPointerToWireType
          this.destructorFunction = null
        } else {
          this['toWireType'] = nonConstNoSmartPtrRawPointerToWireType
          this.destructorFunction = null
        }
      } else {
        this['toWireType'] = genericPointerToWireType
      }
    }
    function replacePublicSymbol(name, value, numArguments) {
      if (!Module.hasOwnProperty(name)) {
        throwInternalError('Replacing nonexistant public symbol')
      }
      if (undefined !== Module[name].overloadTable && undefined !== numArguments) {
        Module[name].overloadTable[numArguments] = value
      } else {
        Module[name] = value
        Module[name].argCount = numArguments
      }
    }
    function dynCallLegacy(sig, ptr, args) {
      var f = Module['dynCall_' + sig]
      return args && args.length ? f.apply(null, [ptr].concat(args)) : f.call(null, ptr)
    }
    function dynCall(sig, ptr, args) {
      if (sig.includes('j')) {
        return dynCallLegacy(sig, ptr, args)
      }
      var rtn = getWasmTableEntry(ptr).apply(null, args)
      return rtn
    }
    function getDynCaller(sig, ptr) {
      var argCache = []
      return function () {
        argCache.length = 0
        Object.assign(argCache, arguments)
        return dynCall(sig, ptr, argCache)
      }
    }
    function embind__requireFunction(signature, rawFunction) {
      signature = readLatin1String(signature)
      function makeDynCaller() {
        if (signature.includes('j')) {
          return getDynCaller(signature, rawFunction)
        }
        return getWasmTableEntry(rawFunction)
      }
      var fp = makeDynCaller()
      if (typeof fp != 'function') {
        throwBindingError('unknown function pointer with signature ' + signature + ': ' + rawFunction)
      }
      return fp
    }
    var UnboundTypeError = undefined
    function getTypeName(type) {
      var ptr = ___getTypeName(type)
      var rv = readLatin1String(ptr)
      _free(ptr)
      return rv
    }
    function throwUnboundTypeError(message, types) {
      var unboundTypes = []
      var seen = {}
      function visit(type) {
        if (seen[type]) {
          return
        }
        if (registeredTypes[type]) {
          return
        }
        if (typeDependencies[type]) {
          typeDependencies[type].forEach(visit)
          return
        }
        unboundTypes.push(type)
        seen[type] = true
      }
      types.forEach(visit)
      throw new UnboundTypeError(message + ': ' + unboundTypes.map(getTypeName).join([', ']))
    }
    function __embind_register_class(
      rawType,
      rawPointerType,
      rawConstPointerType,
      baseClassRawType,
      getActualTypeSignature,
      getActualType,
      upcastSignature,
      upcast,
      downcastSignature,
      downcast,
      name,
      destructorSignature,
      rawDestructor
    ) {
      name = readLatin1String(name)
      getActualType = embind__requireFunction(getActualTypeSignature, getActualType)
      if (upcast) {
        upcast = embind__requireFunction(upcastSignature, upcast)
      }
      if (downcast) {
        downcast = embind__requireFunction(downcastSignature, downcast)
      }
      rawDestructor = embind__requireFunction(destructorSignature, rawDestructor)
      var legalFunctionName = makeLegalFunctionName(name)
      exposePublicSymbol(legalFunctionName, function () {
        throwUnboundTypeError('Cannot construct ' + name + ' due to unbound types', [baseClassRawType])
      })
      whenDependentTypesAreResolved(
        [rawType, rawPointerType, rawConstPointerType],
        baseClassRawType ? [baseClassRawType] : [],
        function (base) {
          base = base[0]
          var baseClass
          var basePrototype
          if (baseClassRawType) {
            baseClass = base.registeredClass
            basePrototype = baseClass.instancePrototype
          } else {
            basePrototype = ClassHandle.prototype
          }
          var constructor = createNamedFunction(legalFunctionName, function () {
            if (Object.getPrototypeOf(this) !== instancePrototype) {
              throw new BindingError("Use 'new' to construct " + name)
            }
            if (undefined === registeredClass.constructor_body) {
              throw new BindingError(name + ' has no accessible constructor')
            }
            var body = registeredClass.constructor_body[arguments.length]
            if (undefined === body) {
              throw new BindingError(
                'Tried to invoke ctor of ' +
                  name +
                  ' with invalid number of parameters (' +
                  arguments.length +
                  ') - expected (' +
                  Object.keys(registeredClass.constructor_body).toString() +
                  ') parameters instead!'
              )
            }
            return body.apply(this, arguments)
          })
          var instancePrototype = Object.create(basePrototype, { constructor: { value: constructor } })
          constructor.prototype = instancePrototype
          var registeredClass = new RegisteredClass(
            name,
            constructor,
            instancePrototype,
            rawDestructor,
            baseClass,
            getActualType,
            upcast,
            downcast
          )
          var referenceConverter = new RegisteredPointer(name, registeredClass, true, false, false)
          var pointerConverter = new RegisteredPointer(name + '*', registeredClass, false, false, false)
          var constPointerConverter = new RegisteredPointer(name + ' const*', registeredClass, false, true, false)
          registeredPointers[rawType] = { pointerType: pointerConverter, constPointerType: constPointerConverter }
          replacePublicSymbol(legalFunctionName, constructor)
          return [referenceConverter, pointerConverter, constPointerConverter]
        }
      )
    }
    function new_(constructor, argumentList) {
      if (!(constructor instanceof Function)) {
        throw new TypeError('new_ called with constructor type ' + typeof constructor + ' which is not a function')
      }
      var dummy = createNamedFunction(constructor.name || 'unknownFunctionName', function () {})
      dummy.prototype = constructor.prototype
      var obj = new dummy()
      var r = constructor.apply(obj, argumentList)
      return r instanceof Object ? r : obj
    }
    function craftInvokerFunction(humanName, argTypes, classType, cppInvokerFunc, cppTargetFunc) {
      var argCount = argTypes.length
      if (argCount < 2) {
        throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!")
      }
      var isClassMethodFunc = argTypes[1] !== null && classType !== null
      var needsDestructorStack = false
      for (var i = 1; i < argTypes.length; ++i) {
        if (argTypes[i] !== null && argTypes[i].destructorFunction === undefined) {
          needsDestructorStack = true
          break
        }
      }
      var returns = argTypes[0].name !== 'void'
      var argsList = ''
      var argsListWired = ''
      for (var i = 0; i < argCount - 2; ++i) {
        argsList += (i !== 0 ? ', ' : '') + 'arg' + i
        argsListWired += (i !== 0 ? ', ' : '') + 'arg' + i + 'Wired'
      }
      var invokerFnBody =
        'return function ' +
        makeLegalFunctionName(humanName) +
        '(' +
        argsList +
        ') {\n' +
        'if (arguments.length !== ' +
        (argCount - 2) +
        ') {\n' +
        "throwBindingError('function " +
        humanName +
        " called with ' + arguments.length + ' arguments, expected " +
        (argCount - 2) +
        " args!');\n" +
        '}\n'
      if (needsDestructorStack) {
        invokerFnBody += 'var destructors = [];\n'
      }
      var dtorStack = needsDestructorStack ? 'destructors' : 'null'
      var args1 = ['throwBindingError', 'invoker', 'fn', 'runDestructors', 'retType', 'classParam']
      var args2 = [throwBindingError, cppInvokerFunc, cppTargetFunc, runDestructors, argTypes[0], argTypes[1]]
      if (isClassMethodFunc) {
        invokerFnBody += 'var thisWired = classParam.toWireType(' + dtorStack + ', this);\n'
      }
      for (var i = 0; i < argCount - 2; ++i) {
        invokerFnBody +=
          'var arg' +
          i +
          'Wired = argType' +
          i +
          '.toWireType(' +
          dtorStack +
          ', arg' +
          i +
          '); // ' +
          argTypes[i + 2].name +
          '\n'
        args1.push('argType' + i)
        args2.push(argTypes[i + 2])
      }
      if (isClassMethodFunc) {
        argsListWired = 'thisWired' + (argsListWired.length > 0 ? ', ' : '') + argsListWired
      }
      invokerFnBody +=
        (returns ? 'var rv = ' : '') + 'invoker(fn' + (argsListWired.length > 0 ? ', ' : '') + argsListWired + ');\n'
      if (needsDestructorStack) {
        invokerFnBody += 'runDestructors(destructors);\n'
      } else {
        for (var i = isClassMethodFunc ? 1 : 2; i < argTypes.length; ++i) {
          var paramName = i === 1 ? 'thisWired' : 'arg' + (i - 2) + 'Wired'
          if (argTypes[i].destructorFunction !== null) {
            invokerFnBody += paramName + '_dtor(' + paramName + '); // ' + argTypes[i].name + '\n'
            args1.push(paramName + '_dtor')
            args2.push(argTypes[i].destructorFunction)
          }
        }
      }
      if (returns) {
        invokerFnBody += 'var ret = retType.fromWireType(rv);\n' + 'return ret;\n'
      } else {
      }
      invokerFnBody += '}\n'
      args1.push(invokerFnBody)
      var invokerFunction = new_(Function, args1).apply(null, args2)
      return invokerFunction
    }
    function heap32VectorToArray(count, firstElement) {
      var array = []
      for (var i = 0; i < count; i++) {
        array.push(HEAPU32[(firstElement + i * 4) >> 2])
      }
      return array
    }
    function __embind_register_class_class_function(
      rawClassType,
      methodName,
      argCount,
      rawArgTypesAddr,
      invokerSignature,
      rawInvoker,
      fn
    ) {
      var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr)
      methodName = readLatin1String(methodName)
      rawInvoker = embind__requireFunction(invokerSignature, rawInvoker)
      whenDependentTypesAreResolved([], [rawClassType], function (classType) {
        classType = classType[0]
        var humanName = classType.name + '.' + methodName
        function unboundTypesHandler() {
          throwUnboundTypeError('Cannot call ' + humanName + ' due to unbound types', rawArgTypes)
        }
        if (methodName.startsWith('@@')) {
          methodName = Symbol[methodName.substring(2)]
        }
        var proto = classType.registeredClass.constructor
        if (undefined === proto[methodName]) {
          unboundTypesHandler.argCount = argCount - 1
          proto[methodName] = unboundTypesHandler
        } else {
          ensureOverloadTable(proto, methodName, humanName)
          proto[methodName].overloadTable[argCount - 1] = unboundTypesHandler
        }
        whenDependentTypesAreResolved([], rawArgTypes, function (argTypes) {
          var invokerArgsArray = [argTypes[0], null].concat(argTypes.slice(1))
          var func = craftInvokerFunction(humanName, invokerArgsArray, null, rawInvoker, fn)
          if (undefined === proto[methodName].overloadTable) {
            func.argCount = argCount - 1
            proto[methodName] = func
          } else {
            proto[methodName].overloadTable[argCount - 1] = func
          }
          return []
        })
        return []
      })
    }
    function __embind_register_class_constructor(
      rawClassType,
      argCount,
      rawArgTypesAddr,
      invokerSignature,
      invoker,
      rawConstructor
    ) {
      assert(argCount > 0)
      var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr)
      invoker = embind__requireFunction(invokerSignature, invoker)
      whenDependentTypesAreResolved([], [rawClassType], function (classType) {
        classType = classType[0]
        var humanName = 'constructor ' + classType.name
        if (undefined === classType.registeredClass.constructor_body) {
          classType.registeredClass.constructor_body = []
        }
        if (undefined !== classType.registeredClass.constructor_body[argCount - 1]) {
          throw new BindingError(
            'Cannot register multiple constructors with identical number of parameters (' +
              (argCount - 1) +
              ") for class '" +
              classType.name +
              "'! Overload resolution is currently only performed using the parameter count, not actual type info!"
          )
        }
        classType.registeredClass.constructor_body[argCount - 1] = () => {
          throwUnboundTypeError('Cannot construct ' + classType.name + ' due to unbound types', rawArgTypes)
        }
        whenDependentTypesAreResolved([], rawArgTypes, function (argTypes) {
          argTypes.splice(1, 0, null)
          classType.registeredClass.constructor_body[argCount - 1] = craftInvokerFunction(
            humanName,
            argTypes,
            null,
            invoker,
            rawConstructor
          )
          return []
        })
        return []
      })
    }
    function __embind_register_class_function(
      rawClassType,
      methodName,
      argCount,
      rawArgTypesAddr,
      invokerSignature,
      rawInvoker,
      context,
      isPureVirtual
    ) {
      var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr)
      methodName = readLatin1String(methodName)
      rawInvoker = embind__requireFunction(invokerSignature, rawInvoker)
      whenDependentTypesAreResolved([], [rawClassType], function (classType) {
        classType = classType[0]
        var humanName = classType.name + '.' + methodName
        if (methodName.startsWith('@@')) {
          methodName = Symbol[methodName.substring(2)]
        }
        if (isPureVirtual) {
          classType.registeredClass.pureVirtualFunctions.push(methodName)
        }
        function unboundTypesHandler() {
          throwUnboundTypeError('Cannot call ' + humanName + ' due to unbound types', rawArgTypes)
        }
        var proto = classType.registeredClass.instancePrototype
        var method = proto[methodName]
        if (
          undefined === method ||
          (undefined === method.overloadTable &&
            method.className !== classType.name &&
            method.argCount === argCount - 2)
        ) {
          unboundTypesHandler.argCount = argCount - 2
          unboundTypesHandler.className = classType.name
          proto[methodName] = unboundTypesHandler
        } else {
          ensureOverloadTable(proto, methodName, humanName)
          proto[methodName].overloadTable[argCount - 2] = unboundTypesHandler
        }
        whenDependentTypesAreResolved([], rawArgTypes, function (argTypes) {
          var memberFunction = craftInvokerFunction(humanName, argTypes, classType, rawInvoker, context)
          if (undefined === proto[methodName].overloadTable) {
            memberFunction.argCount = argCount - 2
            proto[methodName] = memberFunction
          } else {
            proto[methodName].overloadTable[argCount - 2] = memberFunction
          }
          return []
        })
        return []
      })
    }
    function __embind_register_constant(name, type, value) {
      name = readLatin1String(name)
      whenDependentTypesAreResolved([], [type], function (type) {
        type = type[0]
        Module[name] = type['fromWireType'](value)
        return []
      })
    }
    var emval_free_list = []
    var emval_handle_array = [{}, { value: undefined }, { value: null }, { value: true }, { value: false }]
    function __emval_decref(handle) {
      if (handle > 4 && 0 === --emval_handle_array[handle].refcount) {
        emval_handle_array[handle] = undefined
        emval_free_list.push(handle)
      }
    }
    function count_emval_handles() {
      var count = 0
      for (var i = 5; i < emval_handle_array.length; ++i) {
        if (emval_handle_array[i] !== undefined) {
          ++count
        }
      }
      return count
    }
    function get_first_emval() {
      for (var i = 5; i < emval_handle_array.length; ++i) {
        if (emval_handle_array[i] !== undefined) {
          return emval_handle_array[i]
        }
      }
      return null
    }
    function init_emval() {
      Module['count_emval_handles'] = count_emval_handles
      Module['get_first_emval'] = get_first_emval
    }
    var Emval = {
      toValue: (handle) => {
        if (!handle) {
          throwBindingError('Cannot use deleted val. handle = ' + handle)
        }
        return emval_handle_array[handle].value
      },
      toHandle: (value) => {
        switch (value) {
          case undefined:
            return 1
          case null:
            return 2
          case true:
            return 3
          case false:
            return 4
          default: {
            var handle = emval_free_list.length ? emval_free_list.pop() : emval_handle_array.length
            emval_handle_array[handle] = { refcount: 1, value: value }
            return handle
          }
        }
      }
    }
    function __embind_register_emval(rawType, name) {
      name = readLatin1String(name)
      registerType(rawType, {
        name: name,
        fromWireType: function (handle) {
          var rv = Emval.toValue(handle)
          __emval_decref(handle)
          return rv
        },
        toWireType: function (destructors, value) {
          return Emval.toHandle(value)
        },
        argPackAdvance: 8,
        readValueFromPointer: simpleReadValueFromPointer,
        destructorFunction: null
      })
    }
    function enumReadValueFromPointer(name, shift, signed) {
      switch (shift) {
        case 0:
          return function (pointer) {
            var heap = signed ? HEAP8 : HEAPU8
            return this['fromWireType'](heap[pointer])
          }
        case 1:
          return function (pointer) {
            var heap = signed ? HEAP16 : HEAPU16
            return this['fromWireType'](heap[pointer >> 1])
          }
        case 2:
          return function (pointer) {
            var heap = signed ? HEAP32 : HEAPU32
            return this['fromWireType'](heap[pointer >> 2])
          }
        default:
          throw new TypeError('Unknown integer type: ' + name)
      }
    }
    function __embind_register_enum(rawType, name, size, isSigned) {
      var shift = getShiftFromSize(size)
      name = readLatin1String(name)
      function ctor() {}
      ctor.values = {}
      registerType(rawType, {
        name: name,
        constructor: ctor,
        fromWireType: function (c) {
          return this.constructor.values[c]
        },
        toWireType: function (destructors, c) {
          return c.value
        },
        argPackAdvance: 8,
        readValueFromPointer: enumReadValueFromPointer(name, shift, isSigned),
        destructorFunction: null
      })
      exposePublicSymbol(name, ctor)
    }
    function requireRegisteredType(rawType, humanName) {
      var impl = registeredTypes[rawType]
      if (undefined === impl) {
        throwBindingError(humanName + ' has unknown type ' + getTypeName(rawType))
      }
      return impl
    }
    function __embind_register_enum_value(rawEnumType, name, enumValue) {
      var enumType = requireRegisteredType(rawEnumType, 'enum')
      name = readLatin1String(name)
      var Enum = enumType.constructor
      var Value = Object.create(enumType.constructor.prototype, {
        value: { value: enumValue },
        constructor: { value: createNamedFunction(enumType.name + '_' + name, function () {}) }
      })
      Enum.values[enumValue] = Value
      Enum[name] = Value
    }
    function embindRepr(v) {
      if (v === null) {
        return 'null'
      }
      var t = typeof v
      if (t === 'object' || t === 'array' || t === 'function') {
        return v.toString()
      } else {
        return '' + v
      }
    }
    function floatReadValueFromPointer(name, shift) {
      switch (shift) {
        case 2:
          return function (pointer) {
            return this['fromWireType'](HEAPF32[pointer >> 2])
          }
        case 3:
          return function (pointer) {
            return this['fromWireType'](HEAPF64[pointer >> 3])
          }
        default:
          throw new TypeError('Unknown float type: ' + name)
      }
    }
    function __embind_register_float(rawType, name, size) {
      var shift = getShiftFromSize(size)
      name = readLatin1String(name)
      registerType(rawType, {
        name: name,
        fromWireType: function (value) {
          return value
        },
        toWireType: function (destructors, value) {
          return value
        },
        argPackAdvance: 8,
        readValueFromPointer: floatReadValueFromPointer(name, shift),
        destructorFunction: null
      })
    }
    function integerReadValueFromPointer(name, shift, signed) {
      switch (shift) {
        case 0:
          return signed
            ? function readS8FromPointer(pointer) {
                return HEAP8[pointer]
              }
            : function readU8FromPointer(pointer) {
                return HEAPU8[pointer]
              }
        case 1:
          return signed
            ? function readS16FromPointer(pointer) {
                return HEAP16[pointer >> 1]
              }
            : function readU16FromPointer(pointer) {
                return HEAPU16[pointer >> 1]
              }
        case 2:
          return signed
            ? function readS32FromPointer(pointer) {
                return HEAP32[pointer >> 2]
              }
            : function readU32FromPointer(pointer) {
                return HEAPU32[pointer >> 2]
              }
        default:
          throw new TypeError('Unknown integer type: ' + name)
      }
    }
    function __embind_register_integer(primitiveType, name, size, minRange, maxRange) {
      name = readLatin1String(name)
      if (maxRange === -1) {
        maxRange = 4294967295
      }
      var shift = getShiftFromSize(size)
      var fromWireType = (value) => value
      if (minRange === 0) {
        var bitshift = 32 - 8 * size
        fromWireType = (value) => (value << bitshift) >>> bitshift
      }
      var isUnsignedType = name.includes('unsigned')
      var checkAssertions = (value, toTypeName) => {}
      var toWireType
      if (isUnsignedType) {
        toWireType = function (destructors, value) {
          checkAssertions(value, this.name)
          return value >>> 0
        }
      } else {
        toWireType = function (destructors, value) {
          checkAssertions(value, this.name)
          return value
        }
      }
      registerType(primitiveType, {
        name: name,
        fromWireType: fromWireType,
        toWireType: toWireType,
        argPackAdvance: 8,
        readValueFromPointer: integerReadValueFromPointer(name, shift, minRange !== 0),
        destructorFunction: null
      })
    }
    function __embind_register_memory_view(rawType, dataTypeIndex, name) {
      var typeMapping = [
        Int8Array,
        Uint8Array,
        Int16Array,
        Uint16Array,
        Int32Array,
        Uint32Array,
        Float32Array,
        Float64Array
      ]
      var TA = typeMapping[dataTypeIndex]
      function decodeMemoryView(handle) {
        handle = handle >> 2
        var heap = HEAPU32
        var size = heap[handle]
        var data = heap[handle + 1]
        return new TA(heap.buffer, data, size)
      }
      name = readLatin1String(name)
      registerType(
        rawType,
        { name: name, fromWireType: decodeMemoryView, argPackAdvance: 8, readValueFromPointer: decodeMemoryView },
        { ignoreDuplicateRegistrations: true }
      )
    }
    function __embind_register_std_string(rawType, name) {
      name = readLatin1String(name)
      var stdStringIsUTF8 = name === 'std::string'
      registerType(rawType, {
        name: name,
        fromWireType: function (value) {
          var length = HEAPU32[value >> 2]
          var payload = value + 4
          var str
          if (stdStringIsUTF8) {
            var decodeStartPtr = payload
            for (var i = 0; i <= length; ++i) {
              var currentBytePtr = payload + i
              if (i == length || HEAPU8[currentBytePtr] == 0) {
                var maxRead = currentBytePtr - decodeStartPtr
                var stringSegment = UTF8ToString(decodeStartPtr, maxRead)
                if (str === undefined) {
                  str = stringSegment
                } else {
                  str += String.fromCharCode(0)
                  str += stringSegment
                }
                decodeStartPtr = currentBytePtr + 1
              }
            }
          } else {
            var a = new Array(length)
            for (var i = 0; i < length; ++i) {
              a[i] = String.fromCharCode(HEAPU8[payload + i])
            }
            str = a.join('')
          }
          _free(value)
          return str
        },
        toWireType: function (destructors, value) {
          if (value instanceof ArrayBuffer) {
            value = new Uint8Array(value)
          }
          var length
          var valueIsOfTypeString = typeof value == 'string'
          if (
            !(
              valueIsOfTypeString ||
              value instanceof Uint8Array ||
              value instanceof Uint8ClampedArray ||
              value instanceof Int8Array
            )
          ) {
            throwBindingError('Cannot pass non-string to std::string')
          }
          if (stdStringIsUTF8 && valueIsOfTypeString) {
            length = lengthBytesUTF8(value)
          } else {
            length = value.length
          }
          var base = _malloc(4 + length + 1)
          var ptr = base + 4
          HEAPU32[base >> 2] = length
          if (stdStringIsUTF8 && valueIsOfTypeString) {
            stringToUTF8(value, ptr, length + 1)
          } else {
            if (valueIsOfTypeString) {
              for (var i = 0; i < length; ++i) {
                var charCode = value.charCodeAt(i)
                if (charCode > 255) {
                  _free(ptr)
                  throwBindingError('String has UTF-16 code units that do not fit in 8 bits')
                }
                HEAPU8[ptr + i] = charCode
              }
            } else {
              for (var i = 0; i < length; ++i) {
                HEAPU8[ptr + i] = value[i]
              }
            }
          }
          if (destructors !== null) {
            destructors.push(_free, base)
          }
          return base
        },
        argPackAdvance: 8,
        readValueFromPointer: simpleReadValueFromPointer,
        destructorFunction: function (ptr) {
          _free(ptr)
        }
      })
    }
    var UTF16Decoder = typeof TextDecoder != 'undefined' ? new TextDecoder('utf-16le') : undefined
    function UTF16ToString(ptr, maxBytesToRead) {
      var endPtr = ptr
      var idx = endPtr >> 1
      var maxIdx = idx + maxBytesToRead / 2
      while (!(idx >= maxIdx) && HEAPU16[idx]) ++idx
      endPtr = idx << 1
      if (endPtr - ptr > 32 && UTF16Decoder) return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr))
      var str = ''
      for (var i = 0; !(i >= maxBytesToRead / 2); ++i) {
        var codeUnit = HEAP16[(ptr + i * 2) >> 1]
        if (codeUnit == 0) break
        str += String.fromCharCode(codeUnit)
      }
      return str
    }
    function stringToUTF16(str, outPtr, maxBytesToWrite) {
      if (maxBytesToWrite === undefined) {
        maxBytesToWrite = 2147483647
      }
      if (maxBytesToWrite < 2) return 0
      maxBytesToWrite -= 2
      var startPtr = outPtr
      var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length
      for (var i = 0; i < numCharsToWrite; ++i) {
        var codeUnit = str.charCodeAt(i)
        HEAP16[outPtr >> 1] = codeUnit
        outPtr += 2
      }
      HEAP16[outPtr >> 1] = 0
      return outPtr - startPtr
    }
    function lengthBytesUTF16(str) {
      return str.length * 2
    }
    function UTF32ToString(ptr, maxBytesToRead) {
      var i = 0
      var str = ''
      while (!(i >= maxBytesToRead / 4)) {
        var utf32 = HEAP32[(ptr + i * 4) >> 2]
        if (utf32 == 0) break
        ++i
        if (utf32 >= 65536) {
          var ch = utf32 - 65536
          str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023))
        } else {
          str += String.fromCharCode(utf32)
        }
      }
      return str
    }
    function stringToUTF32(str, outPtr, maxBytesToWrite) {
      if (maxBytesToWrite === undefined) {
        maxBytesToWrite = 2147483647
      }
      if (maxBytesToWrite < 4) return 0
      var startPtr = outPtr
      var endPtr = startPtr + maxBytesToWrite - 4
      for (var i = 0; i < str.length; ++i) {
        var codeUnit = str.charCodeAt(i)
        if (codeUnit >= 55296 && codeUnit <= 57343) {
          var trailSurrogate = str.charCodeAt(++i)
          codeUnit = (65536 + ((codeUnit & 1023) << 10)) | (trailSurrogate & 1023)
        }
        HEAP32[outPtr >> 2] = codeUnit
        outPtr += 4
        if (outPtr + 4 > endPtr) break
      }
      HEAP32[outPtr >> 2] = 0
      return outPtr - startPtr
    }
    function lengthBytesUTF32(str) {
      var len = 0
      for (var i = 0; i < str.length; ++i) {
        var codeUnit = str.charCodeAt(i)
        if (codeUnit >= 55296 && codeUnit <= 57343) ++i
        len += 4
      }
      return len
    }
    function __embind_register_std_wstring(rawType, charSize, name) {
      name = readLatin1String(name)
      var decodeString, encodeString, getHeap, lengthBytesUTF, shift
      if (charSize === 2) {
        decodeString = UTF16ToString
        encodeString = stringToUTF16
        lengthBytesUTF = lengthBytesUTF16
        getHeap = () => HEAPU16
        shift = 1
      } else if (charSize === 4) {
        decodeString = UTF32ToString
        encodeString = stringToUTF32
        lengthBytesUTF = lengthBytesUTF32
        getHeap = () => HEAPU32
        shift = 2
      }
      registerType(rawType, {
        name: name,
        fromWireType: function (value) {
          var length = HEAPU32[value >> 2]
          var HEAP = getHeap()
          var str
          var decodeStartPtr = value + 4
          for (var i = 0; i <= length; ++i) {
            var currentBytePtr = value + 4 + i * charSize
            if (i == length || HEAP[currentBytePtr >> shift] == 0) {
              var maxReadBytes = currentBytePtr - decodeStartPtr
              var stringSegment = decodeString(decodeStartPtr, maxReadBytes)
              if (str === undefined) {
                str = stringSegment
              } else {
                str += String.fromCharCode(0)
                str += stringSegment
              }
              decodeStartPtr = currentBytePtr + charSize
            }
          }
          _free(value)
          return str
        },
        toWireType: function (destructors, value) {
          if (!(typeof value == 'string')) {
            throwBindingError('Cannot pass non-string to C++ string type ' + name)
          }
          var length = lengthBytesUTF(value)
          var ptr = _malloc(4 + length + charSize)
          HEAPU32[ptr >> 2] = length >> shift
          encodeString(value, ptr + 4, length + charSize)
          if (destructors !== null) {
            destructors.push(_free, ptr)
          }
          return ptr
        },
        argPackAdvance: 8,
        readValueFromPointer: simpleReadValueFromPointer,
        destructorFunction: function (ptr) {
          _free(ptr)
        }
      })
    }
    function __embind_register_value_array(
      rawType,
      name,
      constructorSignature,
      rawConstructor,
      destructorSignature,
      rawDestructor
    ) {
      tupleRegistrations[rawType] = {
        name: readLatin1String(name),
        rawConstructor: embind__requireFunction(constructorSignature, rawConstructor),
        rawDestructor: embind__requireFunction(destructorSignature, rawDestructor),
        elements: []
      }
    }
    function __embind_register_value_array_element(
      rawTupleType,
      getterReturnType,
      getterSignature,
      getter,
      getterContext,
      setterArgumentType,
      setterSignature,
      setter,
      setterContext
    ) {
      tupleRegistrations[rawTupleType].elements.push({
        getterReturnType: getterReturnType,
        getter: embind__requireFunction(getterSignature, getter),
        getterContext: getterContext,
        setterArgumentType: setterArgumentType,
        setter: embind__requireFunction(setterSignature, setter),
        setterContext: setterContext
      })
    }
    function __embind_register_value_object(
      rawType,
      name,
      constructorSignature,
      rawConstructor,
      destructorSignature,
      rawDestructor
    ) {
      structRegistrations[rawType] = {
        name: readLatin1String(name),
        rawConstructor: embind__requireFunction(constructorSignature, rawConstructor),
        rawDestructor: embind__requireFunction(destructorSignature, rawDestructor),
        fields: []
      }
    }
    function __embind_register_value_object_field(
      structType,
      fieldName,
      getterReturnType,
      getterSignature,
      getter,
      getterContext,
      setterArgumentType,
      setterSignature,
      setter,
      setterContext
    ) {
      structRegistrations[structType].fields.push({
        fieldName: readLatin1String(fieldName),
        getterReturnType: getterReturnType,
        getter: embind__requireFunction(getterSignature, getter),
        getterContext: getterContext,
        setterArgumentType: setterArgumentType,
        setter: embind__requireFunction(setterSignature, setter),
        setterContext: setterContext
      })
    }
    function __embind_register_void(rawType, name) {
      name = readLatin1String(name)
      registerType(rawType, {
        isVoid: true,
        name: name,
        argPackAdvance: 0,
        fromWireType: function () {
          return undefined
        },
        toWireType: function (destructors, o) {
          return undefined
        }
      })
    }
    var nowIsMonotonic = true
    function __emscripten_get_now_is_monotonic() {
      return nowIsMonotonic
    }
    function __emscripten_throw_longjmp() {
      throw Infinity
    }
    function __emval_incref(handle) {
      if (handle > 4) {
        emval_handle_array[handle].refcount += 1
      }
    }
    function __emval_take_value(type, arg) {
      type = requireRegisteredType(type, '_emval_take_value')
      var v = type['readValueFromPointer'](arg)
      return Emval.toHandle(v)
    }
    function __gmtime_js(time, tmPtr) {
      var date = new Date(readI53FromI64(time) * 1e3)
      HEAP32[tmPtr >> 2] = date.getUTCSeconds()
      HEAP32[(tmPtr + 4) >> 2] = date.getUTCMinutes()
      HEAP32[(tmPtr + 8) >> 2] = date.getUTCHours()
      HEAP32[(tmPtr + 12) >> 2] = date.getUTCDate()
      HEAP32[(tmPtr + 16) >> 2] = date.getUTCMonth()
      HEAP32[(tmPtr + 20) >> 2] = date.getUTCFullYear() - 1900
      HEAP32[(tmPtr + 24) >> 2] = date.getUTCDay()
      var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0)
      var yday = ((date.getTime() - start) / (1e3 * 60 * 60 * 24)) | 0
      HEAP32[(tmPtr + 28) >> 2] = yday
    }
    function __isLeapYear(year) {
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
    }
    var __MONTH_DAYS_LEAP_CUMULATIVE = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335]
    var __MONTH_DAYS_REGULAR_CUMULATIVE = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
    function __yday_from_date(date) {
      var isLeapYear = __isLeapYear(date.getFullYear())
      var monthDaysCumulative = isLeapYear ? __MONTH_DAYS_LEAP_CUMULATIVE : __MONTH_DAYS_REGULAR_CUMULATIVE
      var yday = monthDaysCumulative[date.getMonth()] + date.getDate() - 1
      return yday
    }
    function __localtime_js(time, tmPtr) {
      var date = new Date(readI53FromI64(time) * 1e3)
      HEAP32[tmPtr >> 2] = date.getSeconds()
      HEAP32[(tmPtr + 4) >> 2] = date.getMinutes()
      HEAP32[(tmPtr + 8) >> 2] = date.getHours()
      HEAP32[(tmPtr + 12) >> 2] = date.getDate()
      HEAP32[(tmPtr + 16) >> 2] = date.getMonth()
      HEAP32[(tmPtr + 20) >> 2] = date.getFullYear() - 1900
      HEAP32[(tmPtr + 24) >> 2] = date.getDay()
      var yday = __yday_from_date(date) | 0
      HEAP32[(tmPtr + 28) >> 2] = yday
      HEAP32[(tmPtr + 36) >> 2] = -(date.getTimezoneOffset() * 60)
      var start = new Date(date.getFullYear(), 0, 1)
      var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset()
      var winterOffset = start.getTimezoneOffset()
      var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0
      HEAP32[(tmPtr + 32) >> 2] = dst
    }
    function allocateUTF8(str) {
      var size = lengthBytesUTF8(str) + 1
      var ret = _malloc(size)
      if (ret) stringToUTF8Array(str, HEAP8, ret, size)
      return ret
    }
    function __tzset_js(timezone, daylight, tzname) {
      var currentYear = new Date().getFullYear()
      var winter = new Date(currentYear, 0, 1)
      var summer = new Date(currentYear, 6, 1)
      var winterOffset = winter.getTimezoneOffset()
      var summerOffset = summer.getTimezoneOffset()
      var stdTimezoneOffset = Math.max(winterOffset, summerOffset)
      HEAPU32[timezone >> 2] = stdTimezoneOffset * 60
      HEAP32[daylight >> 2] = Number(winterOffset != summerOffset)
      function extractZone(date) {
        var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/)
        return match ? match[1] : 'GMT'
      }
      var winterName = extractZone(winter)
      var summerName = extractZone(summer)
      var winterNamePtr = allocateUTF8(winterName)
      var summerNamePtr = allocateUTF8(summerName)
      if (summerOffset < winterOffset) {
        HEAPU32[tzname >> 2] = winterNamePtr
        HEAPU32[(tzname + 4) >> 2] = summerNamePtr
      } else {
        HEAPU32[tzname >> 2] = summerNamePtr
        HEAPU32[(tzname + 4) >> 2] = winterNamePtr
      }
    }
    function _abort() {
      abort('')
    }
    function _emscripten_set_main_loop_timing(mode, value) {
      Browser.mainLoop.timingMode = mode
      Browser.mainLoop.timingValue = value
      if (!Browser.mainLoop.func) {
        return 1
      }
      if (!Browser.mainLoop.running) {
        Browser.mainLoop.running = true
      }
      if (mode == 0) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setTimeout() {
          var timeUntilNextTick = Math.max(0, Browser.mainLoop.tickStartTime + value - _emscripten_get_now()) | 0
          setTimeout(Browser.mainLoop.runner, timeUntilNextTick)
        }
        Browser.mainLoop.method = 'timeout'
      } else if (mode == 1) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_rAF() {
          Browser.requestAnimationFrame(Browser.mainLoop.runner)
        }
        Browser.mainLoop.method = 'rAF'
      } else if (mode == 2) {
        if (typeof setImmediate == 'undefined') {
          var setImmediates = []
          var emscriptenMainLoopMessageId = 'setimmediate'
          var Browser_setImmediate_messageHandler = (event) => {
            if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
              event.stopPropagation()
              setImmediates.shift()()
            }
          }
          addEventListener('message', Browser_setImmediate_messageHandler, true)
          setImmediate = function Browser_emulated_setImmediate(func) {
            setImmediates.push(func)
            if (ENVIRONMENT_IS_WORKER) {
              if (Module['setImmediates'] === undefined) Module['setImmediates'] = []
              Module['setImmediates'].push(func)
              postMessage({ target: emscriptenMainLoopMessageId })
            } else postMessage(emscriptenMainLoopMessageId, '*')
          }
        }
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setImmediate() {
          setImmediate(Browser.mainLoop.runner)
        }
        Browser.mainLoop.method = 'immediate'
      }
      return 0
    }
    var _emscripten_get_now
    if (ENVIRONMENT_IS_NODE) {
      _emscripten_get_now = () => {
        var t = process['hrtime']()
        return t[0] * 1e3 + t[1] / 1e6
      }
    } else _emscripten_get_now = () => performance.now()
    function setMainLoop(browserIterationFunc, fps, simulateInfiniteLoop, arg, noSetTiming) {
      assert(
        !Browser.mainLoop.func,
        'emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.'
      )
      Browser.mainLoop.func = browserIterationFunc
      Browser.mainLoop.arg = arg
      var thisMainLoopId = Browser.mainLoop.currentlyRunningMainloop
      function checkIsRunning() {
        if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) {
          return false
        }
        return true
      }
      Browser.mainLoop.running = false
      Browser.mainLoop.runner = function Browser_mainLoop_runner() {
        if (ABORT) return
        if (Browser.mainLoop.queue.length > 0) {
          var start = Date.now()
          var blocker = Browser.mainLoop.queue.shift()
          blocker.func(blocker.arg)
          if (Browser.mainLoop.remainingBlockers) {
            var remaining = Browser.mainLoop.remainingBlockers
            var next = remaining % 1 == 0 ? remaining - 1 : Math.floor(remaining)
            if (blocker.counted) {
              Browser.mainLoop.remainingBlockers = next
            } else {
              next = next + 0.5
              Browser.mainLoop.remainingBlockers = (8 * remaining + next) / 9
            }
          }
          out('main loop blocker "' + blocker.name + '" took ' + (Date.now() - start) + ' ms')
          Browser.mainLoop.updateStatus()
          if (!checkIsRunning()) return
          setTimeout(Browser.mainLoop.runner, 0)
          return
        }
        if (!checkIsRunning()) return
        Browser.mainLoop.currentFrameNumber = (Browser.mainLoop.currentFrameNumber + 1) | 0
        if (
          Browser.mainLoop.timingMode == 1 &&
          Browser.mainLoop.timingValue > 1 &&
          Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0
        ) {
          Browser.mainLoop.scheduler()
          return
        } else if (Browser.mainLoop.timingMode == 0) {
          Browser.mainLoop.tickStartTime = _emscripten_get_now()
        }
        Browser.mainLoop.runIter(browserIterationFunc)
        if (!checkIsRunning()) return
        if (typeof SDL == 'object' && SDL.audio && SDL.audio.queueNewAudioData) SDL.audio.queueNewAudioData()
        Browser.mainLoop.scheduler()
      }
      if (!noSetTiming) {
        if (fps && fps > 0) _emscripten_set_main_loop_timing(0, 1e3 / fps)
        else _emscripten_set_main_loop_timing(1, 1)
        Browser.mainLoop.scheduler()
      }
      if (simulateInfiniteLoop) {
        throw 'unwind'
      }
    }
    function handleException(e) {
      if (e instanceof ExitStatus || e == 'unwind') {
        return EXITSTATUS
      }
      quit_(1, e)
    }
    function callUserCallback(func) {
      if (ABORT) {
        return
      }
      try {
        func()
      } catch (e) {
        handleException(e)
      }
    }
    function safeSetTimeout(func, timeout) {
      return setTimeout(function () {
        callUserCallback(func)
      }, timeout)
    }
    function warnOnce(text) {
      if (!warnOnce.shown) warnOnce.shown = {}
      if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1
        if (ENVIRONMENT_IS_NODE) text = 'warning: ' + text
        err(text)
      }
    }
    var Browser = {
      mainLoop: {
        running: false,
        scheduler: null,
        method: '',
        currentlyRunningMainloop: 0,
        func: null,
        arg: 0,
        timingMode: 0,
        timingValue: 0,
        currentFrameNumber: 0,
        queue: [],
        pause: function () {
          Browser.mainLoop.scheduler = null
          Browser.mainLoop.currentlyRunningMainloop++
        },
        resume: function () {
          Browser.mainLoop.currentlyRunningMainloop++
          var timingMode = Browser.mainLoop.timingMode
          var timingValue = Browser.mainLoop.timingValue
          var func = Browser.mainLoop.func
          Browser.mainLoop.func = null
          setMainLoop(func, 0, false, Browser.mainLoop.arg, true)
          _emscripten_set_main_loop_timing(timingMode, timingValue)
          Browser.mainLoop.scheduler()
        },
        updateStatus: function () {
          if (Module['setStatus']) {
            var message = Module['statusMessage'] || 'Please wait...'
            var remaining = Browser.mainLoop.remainingBlockers
            var expected = Browser.mainLoop.expectedBlockers
            if (remaining) {
              if (remaining < expected) {
                Module['setStatus'](message + ' (' + (expected - remaining) + '/' + expected + ')')
              } else {
                Module['setStatus'](message)
              }
            } else {
              Module['setStatus']('')
            }
          }
        },
        runIter: function (func) {
          if (ABORT) return
          if (Module['preMainLoop']) {
            var preRet = Module['preMainLoop']()
            if (preRet === false) {
              return
            }
          }
          callUserCallback(func)
          if (Module['postMainLoop']) Module['postMainLoop']()
        }
      },
      isFullscreen: false,
      pointerLock: false,
      moduleContextCreatedCallbacks: [],
      workers: [],
      init: function () {
        if (!Module['preloadPlugins']) Module['preloadPlugins'] = []
        if (Browser.initted) return
        Browser.initted = true
        try {
          new Blob()
          Browser.hasBlobConstructor = true
        } catch (e) {
          Browser.hasBlobConstructor = false
          err('warning: no blob constructor, cannot create blobs with mimetypes')
        }
        Browser.BlobBuilder =
          typeof MozBlobBuilder != 'undefined'
            ? MozBlobBuilder
            : typeof WebKitBlobBuilder != 'undefined'
              ? WebKitBlobBuilder
              : !Browser.hasBlobConstructor
                ? err('warning: no BlobBuilder')
                : null
        Browser.URLObject = typeof window != 'undefined' ? (window.URL ? window.URL : window.webkitURL) : undefined
        if (!Module.noImageDecoding && typeof Browser.URLObject == 'undefined') {
          err(
            'warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.'
          )
          Module.noImageDecoding = true
        }
        var imagePlugin = {}
        imagePlugin['canHandle'] = function imagePlugin_canHandle(name) {
          return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name)
        }
        imagePlugin['handle'] = function imagePlugin_handle(byteArray, name, onload, onerror) {
          var b = null
          if (Browser.hasBlobConstructor) {
            try {
              b = new Blob([byteArray], { type: Browser.getMimetype(name) })
              if (b.size !== byteArray.length) {
                b = new Blob([new Uint8Array(byteArray).buffer], { type: Browser.getMimetype(name) })
              }
            } catch (e) {
              warnOnce('Blob constructor present but fails: ' + e + '; falling back to blob builder')
            }
          }
          if (!b) {
            var bb = new Browser.BlobBuilder()
            bb.append(new Uint8Array(byteArray).buffer)
            b = bb.getBlob()
          }
          var url = Browser.URLObject.createObjectURL(b)
          var img = new Image()
          img.onload = () => {
            assert(img.complete, 'Image ' + name + ' could not be decoded')
            var canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            var ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0)
            preloadedImages[name] = canvas
            Browser.URLObject.revokeObjectURL(url)
            if (onload) onload(byteArray)
          }
          img.onerror = (event) => {
            out('Image ' + url + ' could not be decoded')
            if (onerror) onerror()
          }
          img.src = url
        }
        Module['preloadPlugins'].push(imagePlugin)
        var audioPlugin = {}
        audioPlugin['canHandle'] = function audioPlugin_canHandle(name) {
          return !Module.noAudioDecoding && name.substr(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 }
        }
        audioPlugin['handle'] = function audioPlugin_handle(byteArray, name, onload, onerror) {
          var done = false
          function finish(audio) {
            if (done) return
            done = true
            preloadedAudios[name] = audio
            if (onload) onload(byteArray)
          }
          function fail() {
            if (done) return
            done = true
            preloadedAudios[name] = new Audio()
            if (onerror) onerror()
          }
          if (Browser.hasBlobConstructor) {
            try {
              var b = new Blob([byteArray], { type: Browser.getMimetype(name) })
            } catch (e) {
              return fail()
            }
            var url = Browser.URLObject.createObjectURL(b)
            var audio = new Audio()
            audio.addEventListener('canplaythrough', () => finish(audio), false)
            audio.onerror = function audio_onerror(event) {
              if (done) return
              err('warning: browser could not fully decode audio ' + name + ', trying slower base64 approach')
              function encode64(data) {
                var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
                var PAD = '='
                var ret = ''
                var leftchar = 0
                var leftbits = 0
                for (var i = 0; i < data.length; i++) {
                  leftchar = (leftchar << 8) | data[i]
                  leftbits += 8
                  while (leftbits >= 6) {
                    var curr = (leftchar >> (leftbits - 6)) & 63
                    leftbits -= 6
                    ret += BASE[curr]
                  }
                }
                if (leftbits == 2) {
                  ret += BASE[(leftchar & 3) << 4]
                  ret += PAD + PAD
                } else if (leftbits == 4) {
                  ret += BASE[(leftchar & 15) << 2]
                  ret += PAD
                }
                return ret
              }
              audio.src = 'data:audio/x-' + name.substr(-3) + ';base64,' + encode64(byteArray)
              finish(audio)
            }
            audio.src = url
            safeSetTimeout(function () {
              finish(audio)
            }, 1e4)
          } else {
            return fail()
          }
        }
        Module['preloadPlugins'].push(audioPlugin)
        function pointerLockChange() {
          Browser.pointerLock =
            document['pointerLockElement'] === Module['canvas'] ||
            document['mozPointerLockElement'] === Module['canvas'] ||
            document['webkitPointerLockElement'] === Module['canvas'] ||
            document['msPointerLockElement'] === Module['canvas']
        }
        var canvas = Module['canvas']
        if (canvas) {
          canvas.requestPointerLock =
            canvas['requestPointerLock'] ||
            canvas['mozRequestPointerLock'] ||
            canvas['webkitRequestPointerLock'] ||
            canvas['msRequestPointerLock'] ||
            (() => {})
          canvas.exitPointerLock =
            document['exitPointerLock'] ||
            document['mozExitPointerLock'] ||
            document['webkitExitPointerLock'] ||
            document['msExitPointerLock'] ||
            (() => {})
          canvas.exitPointerLock = canvas.exitPointerLock.bind(document)
          document.addEventListener('pointerlockchange', pointerLockChange, false)
          document.addEventListener('mozpointerlockchange', pointerLockChange, false)
          document.addEventListener('webkitpointerlockchange', pointerLockChange, false)
          document.addEventListener('mspointerlockchange', pointerLockChange, false)
          if (Module['elementPointerLock']) {
            canvas.addEventListener(
              'click',
              (ev) => {
                if (!Browser.pointerLock && Module['canvas'].requestPointerLock) {
                  Module['canvas'].requestPointerLock()
                  ev.preventDefault()
                }
              },
              false
            )
          }
        }
      },
      handledByPreloadPlugin: function (byteArray, fullname, finish, onerror) {
        Browser.init()
        var handled = false
        Module['preloadPlugins'].forEach(function (plugin) {
          if (handled) return
          if (plugin['canHandle'](fullname)) {
            plugin['handle'](byteArray, fullname, finish, onerror)
            handled = true
          }
        })
        return handled
      },
      createContext: function (canvas, useWebGL, setInModule, webGLContextAttributes) {
        if (useWebGL && Module.ctx && canvas == Module.canvas) return Module.ctx
        var ctx
        var contextHandle
        if (useWebGL) {
          var contextAttributes = { antialias: false, alpha: false, majorVersion: 2 }
          if (webGLContextAttributes) {
            for (var attribute in webGLContextAttributes) {
              contextAttributes[attribute] = webGLContextAttributes[attribute]
            }
          }
          if (typeof GL != 'undefined') {
            contextHandle = GL.createContext(canvas, contextAttributes)
            if (contextHandle) {
              ctx = GL.getContext(contextHandle).GLctx
            }
          }
        } else {
          ctx = canvas.getContext('2d')
        }
        if (!ctx) return null
        if (setInModule) {
          if (!useWebGL)
            assert(
              typeof GLctx == 'undefined',
              'cannot set in module if GLctx is used, but we are a non-GL context that would replace it'
            )
          Module.ctx = ctx
          if (useWebGL) GL.makeContextCurrent(contextHandle)
          Module.useWebGL = useWebGL
          Browser.moduleContextCreatedCallbacks.forEach(function (callback) {
            callback()
          })
          Browser.init()
        }
        return ctx
      },
      destroyContext: function (canvas, useWebGL, setInModule) {},
      fullscreenHandlersInstalled: false,
      lockPointer: undefined,
      resizeCanvas: undefined,
      requestFullscreen: function (lockPointer, resizeCanvas) {
        Browser.lockPointer = lockPointer
        Browser.resizeCanvas = resizeCanvas
        if (typeof Browser.lockPointer == 'undefined') Browser.lockPointer = true
        if (typeof Browser.resizeCanvas == 'undefined') Browser.resizeCanvas = false
        var canvas = Module['canvas']
        function fullscreenChange() {
          Browser.isFullscreen = false
          var canvasContainer = canvas.parentNode
          if (
            (document['fullscreenElement'] ||
              document['mozFullScreenElement'] ||
              document['msFullscreenElement'] ||
              document['webkitFullscreenElement'] ||
              document['webkitCurrentFullScreenElement']) === canvasContainer
          ) {
            canvas.exitFullscreen = Browser.exitFullscreen
            if (Browser.lockPointer) canvas.requestPointerLock()
            Browser.isFullscreen = true
            if (Browser.resizeCanvas) {
              Browser.setFullscreenCanvasSize()
            } else {
              Browser.updateCanvasDimensions(canvas)
            }
          } else {
            canvasContainer.parentNode.insertBefore(canvas, canvasContainer)
            canvasContainer.parentNode.removeChild(canvasContainer)
            if (Browser.resizeCanvas) {
              Browser.setWindowedCanvasSize()
            } else {
              Browser.updateCanvasDimensions(canvas)
            }
          }
          if (Module['onFullScreen']) Module['onFullScreen'](Browser.isFullscreen)
          if (Module['onFullscreen']) Module['onFullscreen'](Browser.isFullscreen)
        }
        if (!Browser.fullscreenHandlersInstalled) {
          Browser.fullscreenHandlersInstalled = true
          document.addEventListener('fullscreenchange', fullscreenChange, false)
          document.addEventListener('mozfullscreenchange', fullscreenChange, false)
          document.addEventListener('webkitfullscreenchange', fullscreenChange, false)
          document.addEventListener('MSFullscreenChange', fullscreenChange, false)
        }
        var canvasContainer = document.createElement('div')
        canvas.parentNode.insertBefore(canvasContainer, canvas)
        canvasContainer.appendChild(canvas)
        canvasContainer.requestFullscreen =
          canvasContainer['requestFullscreen'] ||
          canvasContainer['mozRequestFullScreen'] ||
          canvasContainer['msRequestFullscreen'] ||
          (canvasContainer['webkitRequestFullscreen']
            ? () => canvasContainer['webkitRequestFullscreen'](Element['ALLOW_KEYBOARD_INPUT'])
            : null) ||
          (canvasContainer['webkitRequestFullScreen']
            ? () => canvasContainer['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT'])
            : null)
        canvasContainer.requestFullscreen()
      },
      exitFullscreen: function () {
        if (!Browser.isFullscreen) {
          return false
        }
        var CFS =
          document['exitFullscreen'] ||
          document['cancelFullScreen'] ||
          document['mozCancelFullScreen'] ||
          document['msExitFullscreen'] ||
          document['webkitCancelFullScreen'] ||
          function () {}
        CFS.apply(document, [])
        return true
      },
      nextRAF: 0,
      fakeRequestAnimationFrame: function (func) {
        var now = Date.now()
        if (Browser.nextRAF === 0) {
          Browser.nextRAF = now + 1e3 / 60
        } else {
          while (now + 2 >= Browser.nextRAF) {
            Browser.nextRAF += 1e3 / 60
          }
        }
        var delay = Math.max(Browser.nextRAF - now, 0)
        setTimeout(func, delay)
      },
      requestAnimationFrame: function (func) {
        if (typeof requestAnimationFrame == 'function') {
          requestAnimationFrame(func)
          return
        }
        var RAF = Browser.fakeRequestAnimationFrame
        RAF(func)
      },
      safeSetTimeout: function (func, timeout) {
        return safeSetTimeout(func, timeout)
      },
      safeRequestAnimationFrame: function (func) {
        return Browser.requestAnimationFrame(function () {
          callUserCallback(func)
        })
      },
      getMimetype: function (name) {
        return {
          jpg: 'image/jpeg',
          jpeg: 'image/jpeg',
          png: 'image/png',
          bmp: 'image/bmp',
          ogg: 'audio/ogg',
          wav: 'audio/wav',
          mp3: 'audio/mpeg'
        }[name.substr(name.lastIndexOf('.') + 1)]
      },
      getUserMedia: function (func) {
        if (!window.getUserMedia) {
          window.getUserMedia = navigator['getUserMedia'] || navigator['mozGetUserMedia']
        }
        window.getUserMedia(func)
      },
      getMovementX: function (event) {
        return event['movementX'] || event['mozMovementX'] || event['webkitMovementX'] || 0
      },
      getMovementY: function (event) {
        return event['movementY'] || event['mozMovementY'] || event['webkitMovementY'] || 0
      },
      getMouseWheelDelta: function (event) {
        var delta = 0
        switch (event.type) {
          case 'DOMMouseScroll':
            delta = event.detail / 3
            break
          case 'mousewheel':
            delta = event.wheelDelta / 120
            break
          case 'wheel':
            delta = event.deltaY
            switch (event.deltaMode) {
              case 0:
                delta /= 100
                break
              case 1:
                delta /= 3
                break
              case 2:
                delta *= 80
                break
              default:
                throw 'unrecognized mouse wheel delta mode: ' + event.deltaMode
            }
            break
          default:
            throw 'unrecognized mouse wheel event: ' + event.type
        }
        return delta
      },
      mouseX: 0,
      mouseY: 0,
      mouseMovementX: 0,
      mouseMovementY: 0,
      touches: {},
      lastTouches: {},
      calculateMouseEvent: function (event) {
        if (Browser.pointerLock) {
          if (event.type != 'mousemove' && 'mozMovementX' in event) {
            Browser.mouseMovementX = Browser.mouseMovementY = 0
          } else {
            Browser.mouseMovementX = Browser.getMovementX(event)
            Browser.mouseMovementY = Browser.getMovementY(event)
          }
          if (typeof SDL != 'undefined') {
            Browser.mouseX = SDL.mouseX + Browser.mouseMovementX
            Browser.mouseY = SDL.mouseY + Browser.mouseMovementY
          } else {
            Browser.mouseX += Browser.mouseMovementX
            Browser.mouseY += Browser.mouseMovementY
          }
        } else {
          var rect = Module['canvas'].getBoundingClientRect()
          var cw = Module['canvas'].width
          var ch = Module['canvas'].height
          var scrollX = typeof window.scrollX != 'undefined' ? window.scrollX : window.pageXOffset
          var scrollY = typeof window.scrollY != 'undefined' ? window.scrollY : window.pageYOffset
          if (event.type === 'touchstart' || event.type === 'touchend' || event.type === 'touchmove') {
            var touch = event.touch
            if (touch === undefined) {
              return
            }
            var adjustedX = touch.pageX - (scrollX + rect.left)
            var adjustedY = touch.pageY - (scrollY + rect.top)
            adjustedX = adjustedX * (cw / rect.width)
            adjustedY = adjustedY * (ch / rect.height)
            var coords = { x: adjustedX, y: adjustedY }
            if (event.type === 'touchstart') {
              Browser.lastTouches[touch.identifier] = coords
              Browser.touches[touch.identifier] = coords
            } else if (event.type === 'touchend' || event.type === 'touchmove') {
              var last = Browser.touches[touch.identifier]
              if (!last) last = coords
              Browser.lastTouches[touch.identifier] = last
              Browser.touches[touch.identifier] = coords
            }
            return
          }
          var x = event.pageX - (scrollX + rect.left)
          var y = event.pageY - (scrollY + rect.top)
          x = x * (cw / rect.width)
          y = y * (ch / rect.height)
          Browser.mouseMovementX = x - Browser.mouseX
          Browser.mouseMovementY = y - Browser.mouseY
          Browser.mouseX = x
          Browser.mouseY = y
        }
      },
      resizeListeners: [],
      updateResizeListeners: function () {
        var canvas = Module['canvas']
        Browser.resizeListeners.forEach(function (listener) {
          listener(canvas.width, canvas.height)
        })
      },
      setCanvasSize: function (width, height, noUpdates) {
        var canvas = Module['canvas']
        Browser.updateCanvasDimensions(canvas, width, height)
        if (!noUpdates) Browser.updateResizeListeners()
      },
      windowedWidth: 0,
      windowedHeight: 0,
      setFullscreenCanvasSize: function () {
        if (typeof SDL != 'undefined') {
          var flags = HEAPU32[SDL.screen >> 2]
          flags = flags | 8388608
          HEAP32[SDL.screen >> 2] = flags
        }
        Browser.updateCanvasDimensions(Module['canvas'])
        Browser.updateResizeListeners()
      },
      setWindowedCanvasSize: function () {
        if (typeof SDL != 'undefined') {
          var flags = HEAPU32[SDL.screen >> 2]
          flags = flags & ~8388608
          HEAP32[SDL.screen >> 2] = flags
        }
        Browser.updateCanvasDimensions(Module['canvas'])
        Browser.updateResizeListeners()
      },
      updateCanvasDimensions: function (canvas, wNative, hNative) {
        if (wNative && hNative) {
          canvas.widthNative = wNative
          canvas.heightNative = hNative
        } else {
          wNative = canvas.widthNative
          hNative = canvas.heightNative
        }
        var w = wNative
        var h = hNative
        if (Module['forcedAspectRatio'] && Module['forcedAspectRatio'] > 0) {
          if (w / h < Module['forcedAspectRatio']) {
            w = Math.round(h * Module['forcedAspectRatio'])
          } else {
            h = Math.round(w / Module['forcedAspectRatio'])
          }
        }
        if (
          (document['fullscreenElement'] ||
            document['mozFullScreenElement'] ||
            document['msFullscreenElement'] ||
            document['webkitFullscreenElement'] ||
            document['webkitCurrentFullScreenElement']) === canvas.parentNode &&
          typeof screen != 'undefined'
        ) {
          var factor = Math.min(screen.width / w, screen.height / h)
          w = Math.round(w * factor)
          h = Math.round(h * factor)
        }
        if (Browser.resizeCanvas) {
          if (canvas.width != w) canvas.width = w
          if (canvas.height != h) canvas.height = h
          if (typeof canvas.style != 'undefined') {
            canvas.style.removeProperty('width')
            canvas.style.removeProperty('height')
          }
        } else {
          if (canvas.width != wNative) canvas.width = wNative
          if (canvas.height != hNative) canvas.height = hNative
          if (typeof canvas.style != 'undefined') {
            if (w != wNative || h != hNative) {
              canvas.style.setProperty('width', w + 'px', 'important')
              canvas.style.setProperty('height', h + 'px', 'important')
            } else {
              canvas.style.removeProperty('width')
              canvas.style.removeProperty('height')
            }
          }
        }
      }
    }
    var EGL = {
      errorCode: 12288,
      defaultDisplayInitialized: false,
      currentContext: 0,
      currentReadSurface: 0,
      currentDrawSurface: 0,
      contextAttributes: { alpha: false, depth: false, stencil: false, antialias: false },
      g_bGolMultiSampleEnable: false,
      stringCache: {},
      setErrorCode: function (code) {
        EGL.errorCode = code
      },
      chooseConfig: function (display, attribList, config, config_size, numConfigs) {
        if (display != 62e3) {
          EGL.setErrorCode(12296)
          return 0
        }
        if (attribList) {
          for (;;) {
            var param = HEAP32[attribList >> 2]
            if (param == 12321) {
              var alphaSize = HEAP32[(attribList + 4) >> 2]
              EGL.contextAttributes.alpha = alphaSize > 0
            } else if (param == 12325) {
              var depthSize = HEAP32[(attribList + 4) >> 2]
              EGL.contextAttributes.depth = depthSize > 0
            } else if (param == 12326) {
              var stencilSize = HEAP32[(attribList + 4) >> 2]
              EGL.contextAttributes.stencil = stencilSize > 0
            } else if (param == 12337) {
              var samples = HEAP32[(attribList + 4) >> 2]
              EGL.contextAttributes.antialias = samples > 0
            } else if (param == 12338) {
              var samples = HEAP32[(attribList + 4) >> 2]
              EGL.contextAttributes.antialias = samples == 1
            } else if (param == 12544) {
              var requestedPriority = HEAP32[(attribList + 4) >> 2]
              EGL.contextAttributes.lowLatency = requestedPriority != 12547
            } else if (param == 12344) {
              break
            }
            attribList += 8
          }
        }
        if ((!config || !config_size) && !numConfigs) {
          EGL.setErrorCode(12300)
          return 0
        }
        if (numConfigs) {
          HEAP32[numConfigs >> 2] = 1
        }
        if (config && config_size > 0) {
          HEAP32[config >> 2] = 62002
        }
        EGL.setErrorCode(12288)
        return 1
      }
    }
    function _eglBindAPI(api) {
      if (api == 12448) {
        EGL.setErrorCode(12288)
        return 1
      }
      EGL.setErrorCode(12300)
      return 0
    }
    function _eglChooseConfig(display, attrib_list, configs, config_size, numConfigs) {
      return EGL.chooseConfig(display, attrib_list, configs, config_size, numConfigs)
    }
    function __webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(ctx) {
      return !!(ctx.dibvbi = ctx.getExtension('WEBGL_draw_instanced_base_vertex_base_instance'))
    }
    function __webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(ctx) {
      return !!(ctx.mdibvbi = ctx.getExtension('WEBGL_multi_draw_instanced_base_vertex_base_instance'))
    }
    function __webgl_enable_WEBGL_multi_draw(ctx) {
      return !!(ctx.multiDrawWebgl = ctx.getExtension('WEBGL_multi_draw'))
    }
    var GL = {
      counter: 1,
      buffers: [],
      buffersFreeId: [],
      buffersCounter: { x: 1 },
      programs: [],
      programsFreeId: [],
      programsCounter: { x: 1 },
      framebuffers: [],
      framebuffersFreeId: [],
      framebuffersCounter: { x: 1 },
      renderbuffers: [],
      renderbuffersFreeId: [],
      renderbuffersCounter: { x: 1 },
      textures: [],
      texturesFreeId: [],
      texturesCounter: { x: 1 },
      shaders: [],
      shadersFreeId: [],
      shadersCounter: { x: 1 },
      vaos: [],
      vaosFreeId: [],
      vaosCounter: { x: 1 },
      contexts: [],
      offscreenCanvases: {},
      queries: [],
      queriesFreeId: [],
      queriesCounter: { x: 1 },
      samplers: [],
      samplersFreeId: [],
      samplersCounter: { x: 1 },
      transformFeedbacks: [],
      transformFeedbacksFreeId: [],
      transformFeedbacksCounter: { x: 1 },
      syncs: [],
      syncsFreeId: [],
      syncsCounter: { x: 1 },
      stringCache: {},
      stringiCache: {},
      unpackAlignment: 4,
      recordError: function recordError(errorCode) {
        if (!GL.lastError) {
          GL.lastError = errorCode
        }
      },
      getNewId_old: function (table) {
        var ret = GL.counter++
        for (var i = table.length; i < ret; i++) {
          table[i] = null
        }
        return ret
      },
      getNewId: function (table, freeIdTable, tableCounter) {
        var ret = freeIdTable.length
        if (ret == 0) {
          return tableCounter.x++
        } else {
          return freeIdTable.pop()
        }
      },
      getSource: function (shader, count, string, length) {
        var source = ''
        for (var i = 0; i < count; ++i) {
          var len = length ? HEAP32[(length + i * 4) >> 2] : -1
          source += UTF8ToString(HEAP32[(string + i * 4) >> 2], len < 0 ? undefined : len)
        }
        return source
      },
      createContext: function (canvas, webGLContextAttributes) {
        webGLContextAttributes['preserveDrawingBuffer'] = true
        if (!canvas.getContextSafariWebGL2Fixed) {
          canvas.getContextSafariWebGL2Fixed = canvas.getContext
          function fixedGetContext(ver, attrs) {
            var gl = canvas.getContextSafariWebGL2Fixed(ver, attrs)
            return (ver == 'webgl') == gl instanceof WebGLRenderingContext ? gl : null
          }
          canvas.getContext = fixedGetContext
        }
        var ctx = canvas.getContext('webgl2', webGLContextAttributes)
        if (!ctx) {
          console.log('WebGL2 Unsupported !!!')
          Module.print('WebGL2 Unsupported !!!')
        }
        if (!ctx) return 0
        var handle = GL.registerContext(ctx, webGLContextAttributes)
        return handle
      },
      registerContext: function (ctx, webGLContextAttributes) {
        var handle = GL.getNewId_old(GL.contexts)
        var context = {
          handle: handle,
          attributes: webGLContextAttributes,
          version: webGLContextAttributes.majorVersion,
          GLctx: ctx
        }
        if (ctx.canvas) ctx.canvas.GLctxObject = context
        GL.contexts[handle] = context
        if (
          typeof webGLContextAttributes.enableExtensionsByDefault == 'undefined' ||
          webGLContextAttributes.enableExtensionsByDefault
        ) {
          GL.initExtensions(context)
        }
        return handle
      },
      makeContextCurrent: function (contextHandle) {
        GL.currentContext = GL.contexts[contextHandle]
        Module.ctx = GLctx = GL.currentContext && GL.currentContext.GLctx
        return !(contextHandle && !GLctx)
      },
      getContext: function (contextHandle) {
        return GL.contexts[contextHandle]
      },
      deleteContext: function (contextHandle) {
        if (GL.currentContext === GL.contexts[contextHandle]) GL.currentContext = null
        if (typeof JSEvents == 'object') JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas)
        if (GL.contexts[contextHandle] && GL.contexts[contextHandle].GLctx.canvas)
          GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined
        GL.contexts[contextHandle] = null
      },
      initExtensions: function (context) {
        if (!context) context = GL.currentContext
        if (context.initExtensionsDone) return
        context.initExtensionsDone = true
        var GLctx = context.GLctx
        __webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(GLctx)
        __webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(GLctx)
        if (context.version >= 2) {
          GLctx.disjointTimerQueryExt = GLctx.getExtension('EXT_disjoint_timer_query_webgl2')
        }
        if (context.version < 2 || !GLctx.disjointTimerQueryExt) {
          GLctx.disjointTimerQueryExt = GLctx.getExtension('EXT_disjoint_timer_query')
        }
        __webgl_enable_WEBGL_multi_draw(GLctx)
        var exts = GLctx.getSupportedExtensions() || []
        exts.forEach(function (ext) {
          if (!ext.includes('lose_context') && !ext.includes('debug')) {
            GLctx.getExtension(ext)
          }
        })
      }
    }
    function _eglCreateContext(display, config, hmm, contextAttribs) {
      if (display != 62e3) {
        EGL.setErrorCode(12296)
        return 0
      }
      var glesContextVersion = 1
      for (;;) {
        var param = HEAP32[contextAttribs >> 2]
        if (param == 12440) {
          glesContextVersion = HEAP32[(contextAttribs + 4) >> 2]
        } else if (param == 12344) {
          break
        } else {
          EGL.setErrorCode(12292)
          return 0
        }
        contextAttribs += 8
      }
      if (glesContextVersion < 2 || glesContextVersion > 3) {
        EGL.setErrorCode(12293)
        return 0
      }
      EGL.contextAttributes.majorVersion = glesContextVersion - 1
      EGL.contextAttributes.minorVersion = 0
      if (EGL.g_bGolMultiSampleEnable) {
        EGL.contextAttributes.antialias = true
      } else {
        EGL.contextAttributes.antialias = false
      }
      EGL.context = GL.createContext(Module['canvas'], EGL.contextAttributes)
      if (EGL.context != 0) {
        EGL.setErrorCode(12288)
        GL.makeContextCurrent(EGL.context)
        Module.useWebGL = true
        Browser.moduleContextCreatedCallbacks.forEach(function (callback) {
          callback()
        })
        GL.makeContextCurrent(null)
        return 62004
      } else {
        EGL.setErrorCode(12297)
        return 0
      }
    }
    function _eglCreateWindowSurface(display, config, win, attrib_list) {
      if (display != 62e3) {
        EGL.setErrorCode(12296)
        return 0
      }
      if (config != 62002) {
        EGL.setErrorCode(12293)
        return 0
      }
      EGL.setErrorCode(12288)
      return 62006
    }
    function _eglDestroyContext(display, context) {
      if (display != 62e3) {
        EGL.setErrorCode(12296)
        return 0
      }
      if (context != 62004) {
        EGL.setErrorCode(12294)
        return 0
      }
      GL.deleteContext(EGL.context)
      EGL.setErrorCode(12288)
      if (EGL.currentContext == context) {
        EGL.currentContext = 0
      }
      return 1
    }
    function _eglDestroySurface(display, surface) {
      if (display != 62e3) {
        EGL.setErrorCode(12296)
        return 0
      }
      if (surface != 62006) {
        EGL.setErrorCode(12301)
        return 1
      }
      if (EGL.currentReadSurface == surface) {
        EGL.currentReadSurface = 0
      }
      if (EGL.currentDrawSurface == surface) {
        EGL.currentDrawSurface = 0
      }
      EGL.setErrorCode(12288)
      return 1
    }
    function _eglGetConfigAttrib(display, config, attribute, value) {
      if (display != 62e3) {
        EGL.setErrorCode(12296)
        return 0
      }
      if (config != 62002) {
        EGL.setErrorCode(12293)
        return 0
      }
      if (!value) {
        EGL.setErrorCode(12300)
        return 0
      }
      EGL.setErrorCode(12288)
      switch (attribute) {
        case 12320:
          HEAP32[value >> 2] = EGL.contextAttributes.alpha ? 32 : 24
          return 1
        case 12321:
          HEAP32[value >> 2] = EGL.contextAttributes.alpha ? 8 : 0
          return 1
        case 12322:
          HEAP32[value >> 2] = 8
          return 1
        case 12323:
          HEAP32[value >> 2] = 8
          return 1
        case 12324:
          HEAP32[value >> 2] = 8
          return 1
        case 12325:
          HEAP32[value >> 2] = EGL.contextAttributes.depth ? 24 : 0
          return 1
        case 12326:
          HEAP32[value >> 2] = EGL.contextAttributes.stencil ? 8 : 0
          return 1
        case 12327:
          HEAP32[value >> 2] = 12344
          return 1
        case 12328:
          HEAP32[value >> 2] = 62002
          return 1
        case 12329:
          HEAP32[value >> 2] = 0
          return 1
        case 12330:
          HEAP32[value >> 2] = 4096
          return 1
        case 12331:
          HEAP32[value >> 2] = 16777216
          return 1
        case 12332:
          HEAP32[value >> 2] = 4096
          return 1
        case 12333:
          HEAP32[value >> 2] = 0
          return 1
        case 12334:
          HEAP32[value >> 2] = 0
          return 1
        case 12335:
          HEAP32[value >> 2] = 12344
          return 1
        case 12337:
          HEAP32[value >> 2] = EGL.contextAttributes.antialias ? 4 : 0
          return 1
        case 12338:
          HEAP32[value >> 2] = EGL.contextAttributes.antialias ? 1 : 0
          return 1
        case 12339:
          HEAP32[value >> 2] = 4
          return 1
        case 12340:
          HEAP32[value >> 2] = 12344
          return 1
        case 12341:
        case 12342:
        case 12343:
          HEAP32[value >> 2] = -1
          return 1
        case 12345:
        case 12346:
          HEAP32[value >> 2] = 0
          return 1
        case 12347:
          HEAP32[value >> 2] = 0
          return 1
        case 12348:
          HEAP32[value >> 2] = 1
          return 1
        case 12349:
        case 12350:
          HEAP32[value >> 2] = 0
          return 1
        case 12351:
          HEAP32[value >> 2] = 12430
          return 1
        case 12352:
          HEAP32[value >> 2] = 4
          return 1
        case 12354:
          HEAP32[value >> 2] = 0
          return 1
        default:
          EGL.setErrorCode(12292)
          return 0
      }
    }
    function _eglGetDisplay(nativeDisplayType) {
      EGL.setErrorCode(12288)
      return 62e3
    }
    function _eglGetError() {
      return EGL.errorCode
    }
    function _eglInitialize(display, majorVersion, minorVersion) {
      if (display != 62e3) {
        EGL.setErrorCode(12296)
        return 0
      }
      if (majorVersion) {
        HEAP32[majorVersion >> 2] = 1
      }
      if (minorVersion) {
        HEAP32[minorVersion >> 2] = 4
      }
      EGL.defaultDisplayInitialized = true
      EGL.setErrorCode(12288)
      return 1
    }
    function _eglMakeCurrent(display, draw, read, context) {
      if (display != 62e3) {
        EGL.setErrorCode(12296)
        return 0
      }
      if (context != 0 && context != 62004) {
        EGL.setErrorCode(12294)
        return 0
      }
      if ((read != 0 && read != 62006) || (draw != 0 && draw != 62006)) {
        EGL.setErrorCode(12301)
        return 0
      }
      GL.makeContextCurrent(context ? EGL.context : null)
      EGL.currentContext = context
      EGL.currentDrawSurface = draw
      EGL.currentReadSurface = read
      EGL.setErrorCode(12288)
      return 1
    }
    function _eglQueryString(display, name) {
      if (display != 62e3) {
        EGL.setErrorCode(12296)
        return 0
      }
      EGL.setErrorCode(12288)
      if (EGL.stringCache[name]) return EGL.stringCache[name]
      var ret
      switch (name) {
        case 12371:
          ret = allocateUTF8('Emscripten')
          break
        case 12372:
          ret = allocateUTF8('1.4 Emscripten EGL')
          break
        case 12373:
          ret = allocateUTF8('')
          break
        case 12429:
          ret = allocateUTF8('OpenGL_ES')
          break
        default:
          EGL.setErrorCode(12300)
          return 0
      }
      EGL.stringCache[name] = ret
      return ret
    }
    function _eglSwapBuffers() {
      if (!EGL.defaultDisplayInitialized) {
        EGL.setErrorCode(12289)
      } else if (!Module.ctx) {
        EGL.setErrorCode(12290)
      } else if (Module.ctx.isContextLost()) {
        EGL.setErrorCode(12302)
      } else {
        EGL.setErrorCode(12288)
        return 1
      }
      return 0
    }
    function _eglSwapInterval(display, interval) {
      if (display != 62e3) {
        EGL.setErrorCode(12296)
        return 0
      }
      if (interval == 0) _emscripten_set_main_loop_timing(0, 0)
      else _emscripten_set_main_loop_timing(1, interval)
      EGL.setErrorCode(12288)
      return 1
    }
    function _eglTerminate(display) {
      if (display != 62e3) {
        EGL.setErrorCode(12296)
        return 0
      }
      EGL.currentContext = 0
      EGL.currentReadSurface = 0
      EGL.currentDrawSurface = 0
      EGL.defaultDisplayInitialized = false
      EGL.setErrorCode(12288)
      return 1
    }
    function _eglWaitClient() {
      EGL.setErrorCode(12288)
      return 1
    }
    var _eglWaitGL = _eglWaitClient
    function _eglWaitNative(nativeEngineId) {
      EGL.setErrorCode(12288)
      return 1
    }
    var readEmAsmArgsArray = []
    function readEmAsmArgs(sigPtr, buf) {
      readEmAsmArgsArray.length = 0
      var ch
      buf >>= 2
      while ((ch = HEAPU8[sigPtr++])) {
        buf += (ch != 105) & buf
        readEmAsmArgsArray.push(ch == 105 ? HEAP32[buf] : HEAPF64[buf++ >> 1])
        ++buf
      }
      return readEmAsmArgsArray
    }
    function runEmAsmFunction(code, sigPtr, argbuf) {
      var args = readEmAsmArgs(sigPtr, argbuf)
      return ASM_CONSTS[code].apply(null, args)
    }
    function _emscripten_asm_const_int(code, sigPtr, argbuf) {
      return runEmAsmFunction(code, sigPtr, argbuf)
    }
    function _emscripten_cancel_main_loop() {
      Browser.mainLoop.pause()
      Browser.mainLoop.func = null
    }
    function _emscripten_date_now() {
      return Date.now()
    }
    function withStackSave(f) {
      var stack = stackSave()
      var ret = f()
      stackRestore(stack)
      return ret
    }
    var JSEvents = {
      inEventHandler: 0,
      removeAllEventListeners: function () {
        for (var i = JSEvents.eventHandlers.length - 1; i >= 0; --i) {
          JSEvents._removeHandler(i)
        }
        JSEvents.eventHandlers = []
        JSEvents.deferredCalls = []
      },
      registerRemoveEventListeners: function () {
        if (!JSEvents.removeEventListenersRegistered) {
          __ATEXIT__.push(JSEvents.removeAllEventListeners)
          JSEvents.removeEventListenersRegistered = true
        }
      },
      deferredCalls: [],
      deferCall: function (targetFunction, precedence, argsList) {
        function arraysHaveEqualContent(arrA, arrB) {
          if (arrA.length != arrB.length) return false
          for (var i in arrA) {
            if (arrA[i] != arrB[i]) return false
          }
          return true
        }
        for (var i in JSEvents.deferredCalls) {
          var call = JSEvents.deferredCalls[i]
          if (call.targetFunction == targetFunction && arraysHaveEqualContent(call.argsList, argsList)) {
            return
          }
        }
        JSEvents.deferredCalls.push({ targetFunction: targetFunction, precedence: precedence, argsList: argsList })
        JSEvents.deferredCalls.sort(function (x, y) {
          return x.precedence < y.precedence
        })
      },
      removeDeferredCalls: function (targetFunction) {
        for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
          if (JSEvents.deferredCalls[i].targetFunction == targetFunction) {
            JSEvents.deferredCalls.splice(i, 1)
            --i
          }
        }
      },
      canPerformEventHandlerRequests: function () {
        return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls
      },
      runDeferredCalls: function () {
        if (!JSEvents.canPerformEventHandlerRequests()) {
          return
        }
        for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
          var call = JSEvents.deferredCalls[i]
          JSEvents.deferredCalls.splice(i, 1)
          --i
          call.targetFunction.apply(null, call.argsList)
        }
      },
      eventHandlers: [],
      removeAllHandlersOnTarget: function (target, eventTypeString) {
        for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
          if (
            JSEvents.eventHandlers[i].target == target &&
            (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i].eventTypeString)
          ) {
            JSEvents._removeHandler(i--)
          }
        }
      },
      _removeHandler: function (i) {
        var h = JSEvents.eventHandlers[i]
        h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture)
        JSEvents.eventHandlers.splice(i, 1)
      },
      registerOrRemoveHandler: function (eventHandler) {
        var jsEventHandler = function jsEventHandler(event) {
          ++JSEvents.inEventHandler
          JSEvents.currentEventHandler = eventHandler
          JSEvents.runDeferredCalls()
          eventHandler.handlerFunc(event)
          JSEvents.runDeferredCalls()
          --JSEvents.inEventHandler
        }
        if (eventHandler.callbackfunc) {
          eventHandler.eventListenerFunc = jsEventHandler
          eventHandler.target.addEventListener(eventHandler.eventTypeString, jsEventHandler, eventHandler.useCapture)
          JSEvents.eventHandlers.push(eventHandler)
          JSEvents.registerRemoveEventListeners()
        } else {
          for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
            if (
              JSEvents.eventHandlers[i].target == eventHandler.target &&
              JSEvents.eventHandlers[i].eventTypeString == eventHandler.eventTypeString
            ) {
              JSEvents._removeHandler(i--)
            }
          }
        }
      },
      getNodeNameForTarget: function (target) {
        if (!target) return ''
        if (target == window) return '#window'
        if (target == screen) return '#screen'
        return target && target.nodeName ? target.nodeName : ''
      },
      fullscreenEnabled: function () {
        return document.fullscreenEnabled || document.webkitFullscreenEnabled
      }
    }
    var currentFullscreenStrategy = {}
    function maybeCStringToJsString(cString) {
      return cString > 2 ? UTF8ToString(cString) : cString
    }
    var specialHTMLTargets = [
      0,
      typeof document != 'undefined' ? document : 0,
      typeof window != 'undefined' ? window : 0
    ]
    function findEventTarget(target) {
      target = maybeCStringToJsString(target)
      var domElement =
        specialHTMLTargets[target] || (typeof document != 'undefined' ? document.querySelector(target) : undefined)
      return domElement
    }
    function findCanvasEventTarget(target) {
      return findEventTarget(target)
    }
    function _emscripten_get_canvas_element_size(target, width, height) {
      var canvas = findCanvasEventTarget(target)
      if (!canvas) return -4
      HEAP32[width >> 2] = canvas.width
      HEAP32[height >> 2] = canvas.height
    }
    function getCanvasElementSize(target) {
      return withStackSave(function () {
        var w = stackAlloc(8)
        var h = w + 4
        var targetInt = stackAlloc(target.id.length + 1)
        stringToUTF8(target.id, targetInt, target.id.length + 1)
        var ret = _emscripten_get_canvas_element_size(targetInt, w, h)
        var size = [HEAP32[w >> 2], HEAP32[h >> 2]]
        return size
      })
    }
    function _emscripten_set_canvas_element_size(target, width, height) {
      var canvas = findCanvasEventTarget(target)
      if (!canvas) return -4
      canvas.width = width
      canvas.height = height
      return 0
    }
    function setCanvasElementSize(target, width, height) {
      if (!target.controlTransferredOffscreen) {
        target.width = width
        target.height = height
      } else {
        withStackSave(function () {
          var targetInt = stackAlloc(target.id.length + 1)
          stringToUTF8(target.id, targetInt, target.id.length + 1)
          _emscripten_set_canvas_element_size(targetInt, width, height)
        })
      }
    }
    function registerRestoreOldStyle(canvas) {
      var canvasSize = getCanvasElementSize(canvas)
      var oldWidth = canvasSize[0]
      var oldHeight = canvasSize[1]
      var oldCssWidth = canvas.style.width
      var oldCssHeight = canvas.style.height
      var oldBackgroundColor = canvas.style.backgroundColor
      var oldDocumentBackgroundColor = document.body.style.backgroundColor
      var oldPaddingLeft = canvas.style.paddingLeft
      var oldPaddingRight = canvas.style.paddingRight
      var oldPaddingTop = canvas.style.paddingTop
      var oldPaddingBottom = canvas.style.paddingBottom
      var oldMarginLeft = canvas.style.marginLeft
      var oldMarginRight = canvas.style.marginRight
      var oldMarginTop = canvas.style.marginTop
      var oldMarginBottom = canvas.style.marginBottom
      var oldDocumentBodyMargin = document.body.style.margin
      var oldDocumentOverflow = document.documentElement.style.overflow
      var oldDocumentScroll = document.body.scroll
      var oldImageRendering = canvas.style.imageRendering
      function restoreOldStyle() {
        var fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
        if (!fullscreenElement) {
          document.removeEventListener('fullscreenchange', restoreOldStyle)
          document.removeEventListener('webkitfullscreenchange', restoreOldStyle)
          setCanvasElementSize(canvas, oldWidth, oldHeight)
          canvas.style.width = oldCssWidth
          canvas.style.height = oldCssHeight
          canvas.style.backgroundColor = oldBackgroundColor
          if (!oldDocumentBackgroundColor) document.body.style.backgroundColor = 'white'
          document.body.style.backgroundColor = oldDocumentBackgroundColor
          canvas.style.paddingLeft = oldPaddingLeft
          canvas.style.paddingRight = oldPaddingRight
          canvas.style.paddingTop = oldPaddingTop
          canvas.style.paddingBottom = oldPaddingBottom
          canvas.style.marginLeft = oldMarginLeft
          canvas.style.marginRight = oldMarginRight
          canvas.style.marginTop = oldMarginTop
          canvas.style.marginBottom = oldMarginBottom
          document.body.style.margin = oldDocumentBodyMargin
          document.documentElement.style.overflow = oldDocumentOverflow
          document.body.scroll = oldDocumentScroll
          canvas.style.imageRendering = oldImageRendering
          if (canvas.GLctxObject) canvas.GLctxObject.GLctx.viewport(0, 0, oldWidth, oldHeight)
          if (currentFullscreenStrategy.canvasResizedCallback) {
            getWasmTableEntry(currentFullscreenStrategy.canvasResizedCallback)(
              37,
              0,
              currentFullscreenStrategy.canvasResizedCallbackUserData
            )
          }
        }
      }
      document.addEventListener('fullscreenchange', restoreOldStyle)
      document.addEventListener('webkitfullscreenchange', restoreOldStyle)
      return restoreOldStyle
    }
    function setLetterbox(element, topBottom, leftRight) {
      element.style.paddingLeft = element.style.paddingRight = leftRight + 'px'
      element.style.paddingTop = element.style.paddingBottom = topBottom + 'px'
    }
    function getBoundingClientRect(e) {
      return specialHTMLTargets.indexOf(e) < 0 ? e.getBoundingClientRect() : { left: 0, top: 0 }
    }
    function JSEvents_resizeCanvasForFullscreen(target, strategy) {
      var restoreOldStyle = registerRestoreOldStyle(target)
      var cssWidth = strategy.softFullscreen ? innerWidth : screen.width
      var cssHeight = strategy.softFullscreen ? innerHeight : screen.height
      var rect = getBoundingClientRect(target)
      var windowedCssWidth = rect.width
      var windowedCssHeight = rect.height
      var canvasSize = getCanvasElementSize(target)
      var windowedRttWidth = canvasSize[0]
      var windowedRttHeight = canvasSize[1]
      if (strategy.scaleMode == 3) {
        setLetterbox(target, (cssHeight - windowedCssHeight) / 2, (cssWidth - windowedCssWidth) / 2)
        cssWidth = windowedCssWidth
        cssHeight = windowedCssHeight
      } else if (strategy.scaleMode == 2) {
        if (cssWidth * windowedRttHeight < windowedRttWidth * cssHeight) {
          var desiredCssHeight = (windowedRttHeight * cssWidth) / windowedRttWidth
          setLetterbox(target, (cssHeight - desiredCssHeight) / 2, 0)
          cssHeight = desiredCssHeight
        } else {
          var desiredCssWidth = (windowedRttWidth * cssHeight) / windowedRttHeight
          setLetterbox(target, 0, (cssWidth - desiredCssWidth) / 2)
          cssWidth = desiredCssWidth
        }
      }
      if (!target.style.backgroundColor) target.style.backgroundColor = 'black'
      if (!document.body.style.backgroundColor) document.body.style.backgroundColor = 'black'
      target.style.width = cssWidth + 'px'
      target.style.height = cssHeight + 'px'
      if (strategy.filteringMode == 1) {
        target.style.imageRendering = 'optimizeSpeed'
        target.style.imageRendering = '-moz-crisp-edges'
        target.style.imageRendering = '-o-crisp-edges'
        target.style.imageRendering = '-webkit-optimize-contrast'
        target.style.imageRendering = 'optimize-contrast'
        target.style.imageRendering = 'crisp-edges'
        target.style.imageRendering = 'pixelated'
      }
      var dpiScale = strategy.canvasResolutionScaleMode == 2 ? devicePixelRatio : 1
      if (strategy.canvasResolutionScaleMode != 0) {
        var newWidth = (cssWidth * dpiScale) | 0
        var newHeight = (cssHeight * dpiScale) | 0
        setCanvasElementSize(target, newWidth, newHeight)
        if (target.GLctxObject) target.GLctxObject.GLctx.viewport(0, 0, newWidth, newHeight)
      }
      return restoreOldStyle
    }
    function JSEvents_requestFullscreen(target, strategy) {
      if (strategy.scaleMode != 0 || strategy.canvasResolutionScaleMode != 0) {
        JSEvents_resizeCanvasForFullscreen(target, strategy)
      }
      if (target.requestFullscreen) {
        target.requestFullscreen()
      } else if (target.webkitRequestFullscreen) {
        target.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
      } else {
        return JSEvents.fullscreenEnabled() ? -3 : -1
      }
      currentFullscreenStrategy = strategy
      if (strategy.canvasResizedCallback) {
        getWasmTableEntry(strategy.canvasResizedCallback)(37, 0, strategy.canvasResizedCallbackUserData)
      }
      return 0
    }
    function _emscripten_exit_fullscreen() {
      if (!JSEvents.fullscreenEnabled()) return -1
      JSEvents.removeDeferredCalls(JSEvents_requestFullscreen)
      var d = specialHTMLTargets[1]
      if (d.exitFullscreen) {
        d.fullscreenElement && d.exitFullscreen()
      } else if (d.webkitExitFullscreen) {
        d.webkitFullscreenElement && d.webkitExitFullscreen()
      } else {
        return -1
      }
      return 0
    }
    function requestPointerLock(target) {
      if (target.requestPointerLock) {
        target.requestPointerLock()
      } else {
        if (document.body.requestPointerLock) {
          return -3
        }
        return -1
      }
      return 0
    }
    function _emscripten_exit_pointerlock() {
      JSEvents.removeDeferredCalls(requestPointerLock)
      if (document.exitPointerLock) {
        document.exitPointerLock()
      } else {
        return -1
      }
      return 0
    }
    function traverseStack(args) {
      if (!args || !args.callee || !args.callee.name) {
        return [null, '', '']
      }
      var funstr = args.callee.toString()
      var funcname = args.callee.name
      var str = '('
      var first = true
      for (var i in args) {
        var a = args[i]
        if (!first) {
          str += ', '
        }
        first = false
        if (typeof a == 'number' || typeof a == 'string') {
          str += a
        } else {
          str += '(' + typeof a + ')'
        }
      }
      str += ')'
      var caller = args.callee.caller
      args = caller ? caller.arguments : []
      if (first) str = ''
      return [args, funcname, str]
    }
    function jsStackTrace() {
      var error = new Error()
      if (!error.stack) {
        try {
          throw new Error()
        } catch (e) {
          error = e
        }
        if (!error.stack) {
          return '(no stack trace available)'
        }
      }
      return error.stack.toString()
    }
    function _emscripten_get_callstack_js(flags) {
      var callstack = jsStackTrace()
      var iThisFunc = callstack.lastIndexOf('_emscripten_log')
      var iThisFunc2 = callstack.lastIndexOf('_emscripten_get_callstack')
      var iNextLine = callstack.indexOf('\n', Math.max(iThisFunc, iThisFunc2)) + 1
      callstack = callstack.slice(iNextLine)
      if (flags & 32) {
        warnOnce('EM_LOG_DEMANGLE is deprecated; ignoring')
      }
      if (flags & 8 && typeof emscripten_source_map == 'undefined') {
        warnOnce(
          'Source map information is not available, emscripten_log with EM_LOG_C_STACK will be ignored. Build with "--pre-js $EMSCRIPTEN/src/emscripten-source-map.min.js" linker flag to add source map loading to code.'
        )
        flags ^= 8
        flags |= 16
      }
      var stack_args = null
      if (flags & 128) {
        stack_args = traverseStack(arguments)
        while (stack_args[1].includes('_emscripten_')) stack_args = traverseStack(stack_args[0])
      }
      var lines = callstack.split('\n')
      callstack = ''
      var newFirefoxRe = new RegExp('\\s*(.*?)@(.*?):([0-9]+):([0-9]+)')
      var firefoxRe = new RegExp('\\s*(.*?)@(.*):(.*)(:(.*))?')
      var chromeRe = new RegExp('\\s*at (.*?) \\((.*):(.*):(.*)\\)')
      for (var l in lines) {
        var line = lines[l]
        var symbolName = ''
        var file = ''
        var lineno = 0
        var column = 0
        var parts = chromeRe.exec(line)
        if (parts && parts.length == 5) {
          symbolName = parts[1]
          file = parts[2]
          lineno = parts[3]
          column = parts[4]
        } else {
          parts = newFirefoxRe.exec(line)
          if (!parts) parts = firefoxRe.exec(line)
          if (parts && parts.length >= 4) {
            symbolName = parts[1]
            file = parts[2]
            lineno = parts[3]
            column = parts[4] | 0
          } else {
            callstack += line + '\n'
            continue
          }
        }
        var haveSourceMap = false
        if (flags & 8) {
          var orig = emscripten_source_map.originalPositionFor({ line: lineno, column: column })
          haveSourceMap = orig && orig.source
          if (haveSourceMap) {
            if (flags & 64) {
              orig.source = orig.source.substring(orig.source.replace(/\\/g, '/').lastIndexOf('/') + 1)
            }
            callstack += '    at ' + symbolName + ' (' + orig.source + ':' + orig.line + ':' + orig.column + ')\n'
          }
        }
        if (flags & 16 || !haveSourceMap) {
          if (flags & 64) {
            file = file.substring(file.replace(/\\/g, '/').lastIndexOf('/') + 1)
          }
          callstack +=
            (haveSourceMap ? '     = ' + symbolName : '    at ' + symbolName) +
            ' (' +
            file +
            ':' +
            lineno +
            ':' +
            column +
            ')\n'
        }
        if (flags & 128 && stack_args[0]) {
          if (stack_args[1] == symbolName && stack_args[2].length > 0) {
            callstack = callstack.replace(/\s+$/, '')
            callstack += ' with values: ' + stack_args[1] + stack_args[2] + '\n'
          }
          stack_args = traverseStack(stack_args[0])
        }
      }
      callstack = callstack.replace(/\s+$/, '')
      return callstack
    }
    function _emscripten_get_callstack(flags, str, maxbytes) {
      var callstack = _emscripten_get_callstack_js(flags)
      if (!str || maxbytes <= 0) {
        return lengthBytesUTF8(callstack) + 1
      }
      var bytesWrittenExcludingNull = stringToUTF8(callstack, str, maxbytes)
      return bytesWrittenExcludingNull + 1
    }
    function _emscripten_get_device_pixel_ratio() {
      return (typeof devicePixelRatio == 'number' && devicePixelRatio) || 1
    }
    function _emscripten_get_element_css_size(target, width, height) {
      target = findEventTarget(target)
      if (!target) return -4
      var rect = getBoundingClientRect(target)
      HEAPF64[width >> 3] = rect.width
      HEAPF64[height >> 3] = rect.height
      return 0
    }
    function fillGamepadEventData(eventStruct, e) {
      HEAPF64[eventStruct >> 3] = e.timestamp
      for (var i = 0; i < e.axes.length; ++i) {
        HEAPF64[(eventStruct + i * 8 + 16) >> 3] = e.axes[i]
      }
      for (var i = 0; i < e.buttons.length; ++i) {
        if (typeof e.buttons[i] == 'object') {
          HEAPF64[(eventStruct + i * 8 + 528) >> 3] = e.buttons[i].value
        } else {
          HEAPF64[(eventStruct + i * 8 + 528) >> 3] = e.buttons[i]
        }
      }
      for (var i = 0; i < e.buttons.length; ++i) {
        if (typeof e.buttons[i] == 'object') {
          HEAP32[(eventStruct + i * 4 + 1040) >> 2] = e.buttons[i].pressed
        } else {
          HEAP32[(eventStruct + i * 4 + 1040) >> 2] = e.buttons[i] == 1
        }
      }
      HEAP32[(eventStruct + 1296) >> 2] = e.connected
      HEAP32[(eventStruct + 1300) >> 2] = e.index
      HEAP32[(eventStruct + 8) >> 2] = e.axes.length
      HEAP32[(eventStruct + 12) >> 2] = e.buttons.length
      stringToUTF8(e.id, eventStruct + 1304, 64)
      stringToUTF8(e.mapping, eventStruct + 1368, 64)
    }
    function _emscripten_get_gamepad_status(index, gamepadState) {
      if (index < 0 || index >= JSEvents.lastGamepadState.length) return -5
      if (!JSEvents.lastGamepadState[index]) return -7
      fillGamepadEventData(gamepadState, JSEvents.lastGamepadState[index])
      return 0
    }
    function _emscripten_get_mouse_status(mouseState) {
      if (!JSEvents.mouseEvent) return -7
      HEAP8.set(HEAP8.subarray(JSEvents.mouseEvent, JSEvents.mouseEvent + 72), mouseState)
      return 0
    }
    function _emscripten_get_num_gamepads() {
      return JSEvents.lastGamepadState.length
    }
    function _emscripten_glActiveTexture(x0) {
      GLctx['activeTexture'](x0)
    }
    function _emscripten_glAttachShader(program, shader) {
      GLctx.attachShader(GL.programs[program], GL.shaders[shader])
    }
    function _emscripten_glBeginQuery(target, id) {
      GLctx['beginQuery'](target, GL.queries[id])
    }
    function _emscripten_glBeginQueryEXT(target, id) {
      GLctx.disjointTimerQueryExt['beginQueryEXT'](target, GL.queries[id])
    }
    function _emscripten_glBeginTransformFeedback(x0) {
      GLctx['beginTransformFeedback'](x0)
    }
    function _emscripten_glBindAttribLocation(program, index, name) {
      GLctx.bindAttribLocation(GL.programs[program], index, UTF8ToString(name))
    }
    function _emscripten_glBindBuffer(target, buffer) {
      if (target == 35051) {
        GLctx.currentPixelPackBufferBinding = buffer
      } else if (target == 35052) {
        GLctx.currentPixelUnpackBufferBinding = buffer
      }
      GLctx.bindBuffer(target, GL.buffers[buffer])
    }
    function _emscripten_glBindBufferBase(target, index, buffer) {
      GLctx['bindBufferBase'](target, index, GL.buffers[buffer])
    }
    function _emscripten_glBindBufferRange(target, index, buffer, offset, ptrsize) {
      GLctx['bindBufferRange'](target, index, GL.buffers[buffer], offset, ptrsize)
    }
    function _emscripten_glBindFramebuffer(target, framebuffer) {
      GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer])
    }
    function _emscripten_glBindRenderbuffer(target, renderbuffer) {
      GLctx.bindRenderbuffer(target, GL.renderbuffers[renderbuffer])
    }
    function _emscripten_glBindSampler(unit, sampler) {
      GLctx['bindSampler'](unit, GL.samplers[sampler])
    }
    function _emscripten_glBindTexture(target, texture) {
      GLctx.bindTexture(target, GL.textures[texture])
    }
    function _emscripten_glBindTransformFeedback(target, id) {
      GLctx['bindTransformFeedback'](target, GL.transformFeedbacks[id])
    }
    function _emscripten_glBindVertexArray(vao) {
      GLctx['bindVertexArray'](GL.vaos[vao])
    }
    function _emscripten_glBindVertexArrayOES(vao) {
      GLctx['bindVertexArray'](GL.vaos[vao])
    }
    function _emscripten_glBlendColor(x0, x1, x2, x3) {
      GLctx['blendColor'](x0, x1, x2, x3)
    }
    function _emscripten_glBlendEquation(x0) {
      GLctx['blendEquation'](x0)
    }
    function _emscripten_glBlendEquationSeparate(x0, x1) {
      GLctx['blendEquationSeparate'](x0, x1)
    }
    function _emscripten_glBlendFunc(x0, x1) {
      GLctx['blendFunc'](x0, x1)
    }
    function _emscripten_glBlendFuncSeparate(x0, x1, x2, x3) {
      GLctx['blendFuncSeparate'](x0, x1, x2, x3)
    }
    function _emscripten_glBlitFramebuffer(x0, x1, x2, x3, x4, x5, x6, x7, x8, x9) {
      GLctx['blitFramebuffer'](x0, x1, x2, x3, x4, x5, x6, x7, x8, x9)
    }
    function _emscripten_glBufferData(target, size, data, usage) {
      if (true) {
        if (data && size) {
          GLctx.bufferData(target, HEAPU8, usage, data, size)
        } else {
          GLctx.bufferData(target, size, usage)
        }
      } else {
        GLctx.bufferData(target, data ? HEAPU8.subarray(data, data + size) : size, usage)
      }
    }
    function _emscripten_glBufferSubData(target, offset, size, data) {
      if (true) {
        size && GLctx.bufferSubData(target, offset, HEAPU8, data, size)
        return
      }
      GLctx.bufferSubData(target, offset, HEAPU8.subarray(data, data + size))
    }
    function _emscripten_glCheckFramebufferStatus(x0) {
      return GLctx['checkFramebufferStatus'](x0)
    }
    function _emscripten_glClear(x0) {
      GLctx['clear'](x0)
    }
    function _emscripten_glClearBufferfi(x0, x1, x2, x3) {
      GLctx['clearBufferfi'](x0, x1, x2, x3)
    }
    function _emscripten_glClearBufferfv(buffer, drawbuffer, value) {
      GLctx['clearBufferfv'](buffer, drawbuffer, HEAPF32, value >> 2)
    }
    function _emscripten_glClearBufferiv(buffer, drawbuffer, value) {
      GLctx['clearBufferiv'](buffer, drawbuffer, HEAP32, value >> 2)
    }
    function _emscripten_glClearBufferuiv(buffer, drawbuffer, value) {
      GLctx['clearBufferuiv'](buffer, drawbuffer, HEAPU32, value >> 2)
    }
    function _emscripten_glClearColor(x0, x1, x2, x3) {
      GLctx['clearColor'](x0, x1, x2, x3)
    }
    function _emscripten_glClearDepthf(x0) {
      GLctx['clearDepth'](x0)
    }
    function _emscripten_glClearStencil(x0) {
      GLctx['clearStencil'](x0)
    }
    function convertI32PairToI53(lo, hi) {
      return (lo >>> 0) + hi * 4294967296
    }
    function _emscripten_glClientWaitSync(sync, flags, timeout_low, timeout_high) {
      var timeout = convertI32PairToI53(timeout_low, timeout_high)
      return GLctx.clientWaitSync(GL.syncs[sync], flags, timeout)
    }
    function _emscripten_glColorMask(red, green, blue, alpha) {
      GLctx.colorMask(!!red, !!green, !!blue, !!alpha)
    }
    function _emscripten_glCompileShader(shader) {
      GLctx.compileShader(GL.shaders[shader])
    }
    function _emscripten_glCompressedTexImage2D(target, level, internalFormat, width, height, border, imageSize, data) {
      if (true) {
        if (GLctx.currentPixelUnpackBufferBinding || !imageSize) {
          GLctx['compressedTexImage2D'](target, level, internalFormat, width, height, border, imageSize, data)
        } else {
          GLctx['compressedTexImage2D'](target, level, internalFormat, width, height, border, HEAPU8, data, imageSize)
        }
        return
      }
      GLctx['compressedTexImage2D'](
        target,
        level,
        internalFormat,
        width,
        height,
        border,
        data ? HEAPU8.subarray(data, data + imageSize) : null
      )
    }
    function _emscripten_glCompressedTexImage3D(
      target,
      level,
      internalFormat,
      width,
      height,
      depth,
      border,
      imageSize,
      data
    ) {
      if (GLctx.currentPixelUnpackBufferBinding) {
        GLctx['compressedTexImage3D'](target, level, internalFormat, width, height, depth, border, imageSize, data)
      } else {
        GLctx['compressedTexImage3D'](
          target,
          level,
          internalFormat,
          width,
          height,
          depth,
          border,
          HEAPU8,
          data,
          imageSize
        )
      }
    }
    function _emscripten_glCompressedTexSubImage2D(
      target,
      level,
      xoffset,
      yoffset,
      width,
      height,
      format,
      imageSize,
      data
    ) {
      if (true) {
        if (GLctx.currentPixelUnpackBufferBinding || !imageSize) {
          GLctx['compressedTexSubImage2D'](target, level, xoffset, yoffset, width, height, format, imageSize, data)
        } else {
          GLctx['compressedTexSubImage2D'](
            target,
            level,
            xoffset,
            yoffset,
            width,
            height,
            format,
            HEAPU8,
            data,
            imageSize
          )
        }
        return
      }
      GLctx['compressedTexSubImage2D'](
        target,
        level,
        xoffset,
        yoffset,
        width,
        height,
        format,
        data ? HEAPU8.subarray(data, data + imageSize) : null
      )
    }
    function _emscripten_glCompressedTexSubImage3D(
      target,
      level,
      xoffset,
      yoffset,
      zoffset,
      width,
      height,
      depth,
      format,
      imageSize,
      data
    ) {
      if (GLctx.currentPixelUnpackBufferBinding) {
        GLctx['compressedTexSubImage3D'](
          target,
          level,
          xoffset,
          yoffset,
          zoffset,
          width,
          height,
          depth,
          format,
          imageSize,
          data
        )
      } else {
        GLctx['compressedTexSubImage3D'](
          target,
          level,
          xoffset,
          yoffset,
          zoffset,
          width,
          height,
          depth,
          format,
          HEAPU8,
          data,
          imageSize
        )
      }
    }
    function _emscripten_glCopyBufferSubData(x0, x1, x2, x3, x4) {
      GLctx['copyBufferSubData'](x0, x1, x2, x3, x4)
    }
    function _emscripten_glCopyTexImage2D(x0, x1, x2, x3, x4, x5, x6, x7) {
      GLctx['copyTexImage2D'](x0, x1, x2, x3, x4, x5, x6, x7)
    }
    function _emscripten_glCopyTexSubImage2D(x0, x1, x2, x3, x4, x5, x6, x7) {
      GLctx['copyTexSubImage2D'](x0, x1, x2, x3, x4, x5, x6, x7)
    }
    function _emscripten_glCopyTexSubImage3D(x0, x1, x2, x3, x4, x5, x6, x7, x8) {
      GLctx['copyTexSubImage3D'](x0, x1, x2, x3, x4, x5, x6, x7, x8)
    }
    function _emscripten_glCreateProgram() {
      var id = GL.getNewId(GL.programs, GL.programsFreeId, GL.programsCounter)
      var program = GLctx.createProgram()
      program.name = id
      program.maxUniformLength = program.maxAttributeLength = program.maxUniformBlockNameLength = 0
      program.uniformIdCounter = 1
      GL.programs[id] = program
      return id
    }
    function _emscripten_glCreateShader(shaderType) {
      var id = GL.getNewId(GL.shaders, GL.shadersFreeId, GL.shadersCounter)
      GL.shaders[id] = GLctx.createShader(shaderType)
      return id
    }
    function _emscripten_glCullFace(x0) {
      GLctx['cullFace'](x0)
    }
    function _emscripten_glDeleteBuffers(n, buffers) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(buffers + i * 4) >> 2]
        var buffer = GL.buffers[id]
        if (!buffer) continue
        GLctx.deleteBuffer(buffer)
        buffer.name = 0
        GL.buffers[id] = null
        GL.buffersFreeId.push(id)
        if (id == GLctx.currentPixelPackBufferBinding) GLctx.currentPixelPackBufferBinding = 0
        if (id == GLctx.currentPixelUnpackBufferBinding) GLctx.currentPixelUnpackBufferBinding = 0
      }
    }
    function _emscripten_glDeleteFramebuffers(n, framebuffers) {
      for (var i = 0; i < n; ++i) {
        var id = HEAP32[(framebuffers + i * 4) >> 2]
        var framebuffer = GL.framebuffers[id]
        if (!framebuffer) continue
        GLctx.deleteFramebuffer(framebuffer)
        framebuffer.name = 0
        GL.framebuffers[id] = null
        GL.framebuffersFreeId.push(id)
      }
    }
    function _emscripten_glDeleteProgram(id) {
      if (!id) return
      var program = GL.programs[id]
      if (!program) {
        GL.recordError(1281)
        return
      }
      GLctx.deleteProgram(program)
      program.name = 0
      GL.programs[id] = null
      GL.programsFreeId.push(id)
    }
    function _emscripten_glDeleteQueries(n, ids) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(ids + i * 4) >> 2]
        var query = GL.queries[id]
        if (!query) continue
        GLctx['deleteQuery'](query)
        GL.queries[id] = null
        GL.queriesFreeId.push(id)
      }
    }
    function _emscripten_glDeleteQueriesEXT(n, ids) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(ids + i * 4) >> 2]
        var query = GL.queries[id]
        if (!query) continue
        GLctx.disjointTimerQueryExt['deleteQueryEXT'](query)
        GL.queries[id] = null
        GL.queriesFreeId.push(id)
      }
    }
    function _emscripten_glDeleteRenderbuffers(n, renderbuffers) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(renderbuffers + i * 4) >> 2]
        var renderbuffer = GL.renderbuffers[id]
        if (!renderbuffer) continue
        GLctx.deleteRenderbuffer(renderbuffer)
        renderbuffer.name = 0
        GL.renderbuffers[id] = null
        GL.renderbuffersFreeId.push(id)
      }
    }
    function _emscripten_glDeleteSamplers(n, samplers) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(samplers + i * 4) >> 2]
        var sampler = GL.samplers[id]
        if (!sampler) continue
        GLctx['deleteSampler'](sampler)
        sampler.name = 0
        GL.samplers[id] = null
        GL.samplersFreeId.push(id)
      }
    }
    function _emscripten_glDeleteShader(id) {
      if (!id) return
      var shader = GL.shaders[id]
      if (!shader) {
        GL.recordError(1281)
        return
      }
      GLctx.deleteShader(shader)
      GL.shaders[id] = null
      GL.shadersFreeId.push(id)
    }
    function _emscripten_glDeleteSync(id) {
      if (!id) return
      var sync = GL.syncs[id]
      if (!sync) {
        GL.recordError(1281)
        return
      }
      GLctx.deleteSync(sync)
      sync.name = 0
      GL.syncs[id] = null
      GL.syncsFreeId.push(id)
    }
    function _emscripten_glDeleteTextures(n, textures) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(textures + i * 4) >> 2]
        var texture = GL.textures[id]
        if (!texture) continue
        GLctx.deleteTexture(texture)
        texture.name = 0
        GL.textures[id] = null
        GL.texturesFreeId.push(id)
      }
    }
    function _emscripten_glDeleteTransformFeedbacks(n, ids) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(ids + i * 4) >> 2]
        var transformFeedback = GL.transformFeedbacks[id]
        if (!transformFeedback) continue
        GLctx['deleteTransformFeedback'](transformFeedback)
        transformFeedback.name = 0
        GL.transformFeedbacks[id] = null
        GL.transformFeedbacksFreeId.push(id)
      }
    }
    function _emscripten_glDeleteVertexArrays(n, vaos) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(vaos + i * 4) >> 2]
        GLctx['deleteVertexArray'](GL.vaos[id])
        GL.vaos[id] = null
        GL.vaosFreeId.push(id)
      }
    }
    function _emscripten_glDeleteVertexArraysOES(n, vaos) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(vaos + i * 4) >> 2]
        GLctx['deleteVertexArray'](GL.vaos[id])
        GL.vaos[id] = null
        GL.vaosFreeId.push(id)
      }
    }
    function _emscripten_glDepthFunc(x0) {
      GLctx['depthFunc'](x0)
    }
    function _emscripten_glDepthMask(flag) {
      GLctx.depthMask(!!flag)
    }
    function _emscripten_glDepthRangef(x0, x1) {
      GLctx['depthRange'](x0, x1)
    }
    function _emscripten_glDetachShader(program, shader) {
      GLctx.detachShader(GL.programs[program], GL.shaders[shader])
    }
    function _emscripten_glDisable(x0) {
      GLctx['disable'](x0)
    }
    function _emscripten_glDisableVertexAttribArray(index) {
      GLctx.disableVertexAttribArray(index)
    }
    function _emscripten_glDrawArrays(mode, first, count) {
      GLctx.drawArrays(mode, first, count)
    }
    function _emscripten_glDrawArraysInstanced(mode, first, count, primcount) {
      GLctx['drawArraysInstanced'](mode, first, count, primcount)
    }
    function _emscripten_glDrawArraysInstancedANGLE(mode, first, count, primcount) {
      GLctx['drawArraysInstanced'](mode, first, count, primcount)
    }
    function _emscripten_glDrawArraysInstancedARB(mode, first, count, primcount) {
      GLctx['drawArraysInstanced'](mode, first, count, primcount)
    }
    function _emscripten_glDrawArraysInstancedEXT(mode, first, count, primcount) {
      GLctx['drawArraysInstanced'](mode, first, count, primcount)
    }
    function _emscripten_glDrawArraysInstancedNV(mode, first, count, primcount) {
      GLctx['drawArraysInstanced'](mode, first, count, primcount)
    }
    var tempFixedLengthArray = []
    function _emscripten_glDrawBuffers(n, bufs) {
      var bufArray = tempFixedLengthArray[n]
      for (var i = 0; i < n; i++) {
        bufArray[i] = HEAP32[(bufs + i * 4) >> 2]
      }
      GLctx['drawBuffers'](bufArray)
    }
    function _emscripten_glDrawBuffersEXT(n, bufs) {
      var bufArray = tempFixedLengthArray[n]
      for (var i = 0; i < n; i++) {
        bufArray[i] = HEAP32[(bufs + i * 4) >> 2]
      }
      GLctx['drawBuffers'](bufArray)
    }
    function _emscripten_glDrawBuffersWEBGL(n, bufs) {
      var bufArray = tempFixedLengthArray[n]
      for (var i = 0; i < n; i++) {
        bufArray[i] = HEAP32[(bufs + i * 4) >> 2]
      }
      GLctx['drawBuffers'](bufArray)
    }
    function _emscripten_glDrawElements(mode, count, type, indices) {
      GLctx.drawElements(mode, count, type, indices)
    }
    function _emscripten_glDrawElementsInstanced(mode, count, type, indices, primcount) {
      GLctx['drawElementsInstanced'](mode, count, type, indices, primcount)
    }
    function _emscripten_glDrawElementsInstancedANGLE(mode, count, type, indices, primcount) {
      GLctx['drawElementsInstanced'](mode, count, type, indices, primcount)
    }
    function _emscripten_glDrawElementsInstancedARB(mode, count, type, indices, primcount) {
      GLctx['drawElementsInstanced'](mode, count, type, indices, primcount)
    }
    function _emscripten_glDrawElementsInstancedEXT(mode, count, type, indices, primcount) {
      GLctx['drawElementsInstanced'](mode, count, type, indices, primcount)
    }
    function _emscripten_glDrawElementsInstancedNV(mode, count, type, indices, primcount) {
      GLctx['drawElementsInstanced'](mode, count, type, indices, primcount)
    }
    function _glDrawElements(mode, count, type, indices) {
      GLctx.drawElements(mode, count, type, indices)
    }
    function _emscripten_glDrawRangeElements(mode, start, end, count, type, indices) {
      _glDrawElements(mode, count, type, indices)
    }
    function _emscripten_glEnable(x0) {
      GLctx['enable'](x0)
    }
    function _emscripten_glEnableVertexAttribArray(index) {
      GLctx.enableVertexAttribArray(index)
    }
    function _emscripten_glEndQuery(x0) {
      GLctx['endQuery'](x0)
    }
    function _emscripten_glEndQueryEXT(target) {
      GLctx.disjointTimerQueryExt['endQueryEXT'](target)
    }
    function _emscripten_glEndTransformFeedback() {
      GLctx['endTransformFeedback']()
    }
    function _emscripten_glFenceSync(condition, flags) {
      var sync = GLctx.fenceSync(condition, flags)
      if (sync) {
        var id = GL.getNewId(GL.syncs, GL.syncsFreeId, GL.syncsCounter)
        sync.name = id
        GL.syncs[id] = sync
        return id
      }
      return 0
    }
    function _emscripten_glFinish() {
      GLctx['finish']()
    }
    function _emscripten_glFlush() {
      GLctx['flush']()
    }
    function _emscripten_glFramebufferRenderbuffer(target, attachment, renderbuffertarget, renderbuffer) {
      GLctx.framebufferRenderbuffer(target, attachment, renderbuffertarget, GL.renderbuffers[renderbuffer])
    }
    function _emscripten_glFramebufferTexture2D(target, attachment, textarget, texture, level) {
      GLctx.framebufferTexture2D(target, attachment, textarget, GL.textures[texture], level)
    }
    function _emscripten_glFramebufferTextureLayer(target, attachment, texture, level, layer) {
      GLctx.framebufferTextureLayer(target, attachment, GL.textures[texture], level, layer)
    }
    function _emscripten_glFrontFace(x0) {
      GLctx['frontFace'](x0)
    }
    function __glGenObject(n, buffers, createFunction, objectTable, freeIdTable, tableCounter) {
      for (var i = 0; i < n; i++) {
        var buffer = GLctx[createFunction]()
        var id = buffer && GL.getNewId(objectTable, freeIdTable, tableCounter)
        if (buffer) {
          buffer.name = id
          objectTable[id] = buffer
        } else {
          GL.recordError(1282)
        }
        HEAP32[(buffers + i * 4) >> 2] = id
      }
    }
    function _emscripten_glGenBuffers(n, buffers) {
      __glGenObject(n, buffers, 'createBuffer', GL.buffers, GL.buffersFreeId, GL.buffersCounter)
    }
    function _emscripten_glGenFramebuffers(n, ids) {
      __glGenObject(n, ids, 'createFramebuffer', GL.framebuffers, GL.framebuffersFreeId, GL.framebuffersCounter)
    }
    function _emscripten_glGenQueries(n, ids) {
      __glGenObject(n, ids, 'createQuery', GL.queries, GL.queriesFreeId, GL.queriesCounter)
    }
    function _emscripten_glGenQueriesEXT(n, ids) {
      for (var i = 0; i < n; i++) {
        var query = GLctx.disjointTimerQueryExt['createQueryEXT']()
        if (!query) {
          GL.recordError(1282)
          while (i < n) HEAP32[(ids + i++ * 4) >> 2] = 0
          return
        }
        var id = GL.getNewId(GL.queries, GL.queriesFreeId, GL.queriesCounter)
        query.name = id
        GL.queries[id] = query
        HEAP32[(ids + i * 4) >> 2] = id
      }
    }
    function _emscripten_glGenRenderbuffers(n, renderbuffers) {
      __glGenObject(
        n,
        renderbuffers,
        'createRenderbuffer',
        GL.renderbuffers,
        GL.renderbuffersFreeId,
        GL.renderbuffersCounter
      )
    }
    function _emscripten_glGenSamplers(n, samplers) {
      __glGenObject(n, samplers, 'createSampler', GL.samplers, GL.samplersFreeId, GL.samplersCounter)
    }
    function _emscripten_glGenTextures(n, textures) {
      __glGenObject(n, textures, 'createTexture', GL.textures, GL.texturesFreeId, GL.texturesCounter)
    }
    function _emscripten_glGenTransformFeedbacks(n, ids) {
      __glGenObject(
        n,
        ids,
        'createTransformFeedback',
        GL.transformFeedbacks,
        GL.transformFeedbacksFreeId,
        GL.transformFeedbacksCounter
      )
    }
    function _emscripten_glGenVertexArrays(n, arrays) {
      __glGenObject(n, arrays, 'createVertexArray', GL.vaos, GL.vaosFreeId, GL.vaosCounter)
    }
    function _emscripten_glGenVertexArraysOES(n, arrays) {
      __glGenObject(n, arrays, 'createVertexArray', GL.vaos, GL.vaosFreeId, GL.vaosCounter)
    }
    function _emscripten_glGenerateMipmap(x0) {
      GLctx['generateMipmap'](x0)
    }
    function __glGetActiveAttribOrUniform(funcName, program, index, bufSize, length, size, type, name) {
      program = GL.programs[program]
      var info = GLctx[funcName](program, index)
      if (info) {
        var numBytesWrittenExclNull = name && stringToUTF8(info.name, name, bufSize)
        if (length) HEAP32[length >> 2] = numBytesWrittenExclNull
        if (size) HEAP32[size >> 2] = info.size
        if (type) HEAP32[type >> 2] = info.type
      }
    }
    function _emscripten_glGetActiveAttrib(program, index, bufSize, length, size, type, name) {
      __glGetActiveAttribOrUniform('getActiveAttrib', program, index, bufSize, length, size, type, name)
    }
    function _emscripten_glGetActiveUniform(program, index, bufSize, length, size, type, name) {
      __glGetActiveAttribOrUniform('getActiveUniform', program, index, bufSize, length, size, type, name)
    }
    function _emscripten_glGetActiveUniformBlockName(program, uniformBlockIndex, bufSize, length, uniformBlockName) {
      program = GL.programs[program]
      var result = GLctx['getActiveUniformBlockName'](program, uniformBlockIndex)
      if (!result) return
      if (uniformBlockName && bufSize > 0) {
        var numBytesWrittenExclNull = stringToUTF8(result, uniformBlockName, bufSize)
        if (length) HEAP32[length >> 2] = numBytesWrittenExclNull
      } else {
        if (length) HEAP32[length >> 2] = 0
      }
    }
    function _emscripten_glGetActiveUniformBlockiv(program, uniformBlockIndex, pname, params) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      program = GL.programs[program]
      if (pname == 35393) {
        var name = GLctx['getActiveUniformBlockName'](program, uniformBlockIndex)
        HEAP32[params >> 2] = name.length + 1
        return
      }
      var result = GLctx['getActiveUniformBlockParameter'](program, uniformBlockIndex, pname)
      if (result === null) return
      if (pname == 35395) {
        for (var i = 0; i < result.length; i++) {
          HEAP32[(params + i * 4) >> 2] = result[i]
        }
      } else {
        HEAP32[params >> 2] = result
      }
    }
    function _emscripten_glGetActiveUniformsiv(program, uniformCount, uniformIndices, pname, params) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      if (uniformCount > 0 && uniformIndices == 0) {
        GL.recordError(1281)
        return
      }
      program = GL.programs[program]
      var ids = []
      for (var i = 0; i < uniformCount; i++) {
        ids.push(HEAP32[(uniformIndices + i * 4) >> 2])
      }
      var result = GLctx['getActiveUniforms'](program, ids, pname)
      if (!result) return
      var len = result.length
      for (var i = 0; i < len; i++) {
        HEAP32[(params + i * 4) >> 2] = result[i]
      }
    }
    function _emscripten_glGetAttachedShaders(program, maxCount, count, shaders) {
      var result = GLctx.getAttachedShaders(GL.programs[program])
      var len = result.length
      if (len > maxCount) {
        len = maxCount
      }
      HEAP32[count >> 2] = len
      for (var i = 0; i < len; ++i) {
        var id = GL.shaders.indexOf(result[i])
        HEAP32[(shaders + i * 4) >> 2] = id
      }
    }
    function _emscripten_glGetAttribLocation(program, name) {
      return GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name))
    }
    function writeI53ToI64(ptr, num) {
      HEAPU32[ptr >> 2] = num
      HEAPU32[(ptr + 4) >> 2] = (num - HEAPU32[ptr >> 2]) / 4294967296
    }
    function emscriptenWebGLGet(name_, p, type) {
      if (!p) {
        GL.recordError(1281)
        return
      }
      var ret = undefined
      switch (name_) {
        case 36346:
          ret = 1
          break
        case 36344:
          if (type != 0 && type != 1) {
            GL.recordError(1280)
          }
          return
        case 34814:
        case 36345:
          ret = 0
          break
        case 34466:
          var formats = GLctx.getParameter(34467)
          ret = formats ? formats.length : 0
          break
        case 33309:
          if (GL.currentContext.version < 2) {
            GL.recordError(1282)
            return
          }
          var exts = GLctx.getSupportedExtensions() || []
          ret = 2 * exts.length
          break
        case 33307:
        case 33308:
          if (GL.currentContext.version < 2) {
            GL.recordError(1280)
            return
          }
          ret = name_ == 33307 ? 3 : 0
          break
      }
      if (ret === undefined) {
        var result = GLctx.getParameter(name_)
        switch (typeof result) {
          case 'number':
            ret = result
            break
          case 'boolean':
            ret = result ? 1 : 0
            break
          case 'string':
            GL.recordError(1280)
            return
          case 'object':
            if (result === null) {
              switch (name_) {
                case 34964:
                case 35725:
                case 34965:
                case 36006:
                case 36007:
                case 32873:
                case 34229:
                case 36662:
                case 36663:
                case 35053:
                case 35055:
                case 36010:
                case 35097:
                case 35869:
                case 32874:
                case 36389:
                case 35983:
                case 35368:
                case 34068: {
                  ret = 0
                  break
                }
                default: {
                  GL.recordError(1280)
                  return
                }
              }
            } else if (
              result instanceof Float32Array ||
              result instanceof Uint32Array ||
              result instanceof Int32Array ||
              result instanceof Array
            ) {
              for (var i = 0; i < result.length; ++i) {
                switch (type) {
                  case 0:
                    HEAP32[(p + i * 4) >> 2] = result[i]
                    break
                  case 2:
                    HEAPF32[(p + i * 4) >> 2] = result[i]
                    break
                  case 4:
                    HEAP8[(p + i) >> 0] = result[i] ? 1 : 0
                    break
                }
              }
              return
            } else {
              try {
                ret = result.name | 0
              } catch (e) {
                GL.recordError(1280)
                err(
                  'GL_INVALID_ENUM in glGet' +
                    type +
                    'v: Unknown object returned from WebGL getParameter(' +
                    name_ +
                    ')! (error: ' +
                    e +
                    ')'
                )
                return
              }
            }
            break
          default:
            GL.recordError(1280)
            err(
              'GL_INVALID_ENUM in glGet' +
                type +
                'v: Native code calling glGet' +
                type +
                'v(' +
                name_ +
                ') and it returns ' +
                result +
                ' of type ' +
                typeof result +
                '!'
            )
            return
        }
      }
      switch (type) {
        case 1:
          writeI53ToI64(p, ret)
          break
        case 0:
          HEAP32[p >> 2] = ret
          break
        case 2:
          HEAPF32[p >> 2] = ret
          break
        case 4:
          HEAP8[p >> 0] = ret ? 1 : 0
          break
      }
    }
    function _emscripten_glGetBooleanv(name_, p) {
      emscriptenWebGLGet(name_, p, 4)
    }
    function _emscripten_glGetBufferParameteri64v(target, value, data) {
      if (!data) {
        GL.recordError(1281)
        return
      }
      writeI53ToI64(data, GLctx.getBufferParameter(target, value))
    }
    function _emscripten_glGetBufferParameteriv(target, value, data) {
      if (!data) {
        GL.recordError(1281)
        return
      }
      HEAP32[data >> 2] = GLctx.getBufferParameter(target, value)
    }
    function _emscripten_glGetError() {
      var error = GLctx.getError() || GL.lastError
      GL.lastError = 0
      return error
    }
    function _emscripten_glGetFloatv(name_, p) {
      emscriptenWebGLGet(name_, p, 2)
    }
    function _emscripten_glGetFragDataLocation(program, name) {
      return GLctx['getFragDataLocation'](GL.programs[program], UTF8ToString(name))
    }
    function _emscripten_glGetFramebufferAttachmentParameteriv(target, attachment, pname, params) {
      var result = GLctx.getFramebufferAttachmentParameter(target, attachment, pname)
      if (result instanceof WebGLRenderbuffer || result instanceof WebGLTexture) {
        result = result.name | 0
      }
      HEAP32[params >> 2] = result
    }
    function emscriptenWebGLGetIndexed(target, index, data, type) {
      if (!data) {
        GL.recordError(1281)
        return
      }
      var result = GLctx['getIndexedParameter'](target, index)
      var ret
      switch (typeof result) {
        case 'boolean':
          ret = result ? 1 : 0
          break
        case 'number':
          ret = result
          break
        case 'object':
          if (result === null) {
            switch (target) {
              case 35983:
              case 35368:
                ret = 0
                break
              default: {
                GL.recordError(1280)
                return
              }
            }
          } else if (result instanceof WebGLBuffer) {
            ret = result.name | 0
          } else {
            GL.recordError(1280)
            return
          }
          break
        default:
          GL.recordError(1280)
          return
      }
      switch (type) {
        case 1:
          writeI53ToI64(data, ret)
          break
        case 0:
          HEAP32[data >> 2] = ret
          break
        case 2:
          HEAPF32[data >> 2] = ret
          break
        case 4:
          HEAP8[data >> 0] = ret ? 1 : 0
          break
        default:
          throw 'internal emscriptenWebGLGetIndexed() error, bad type: ' + type
      }
    }
    function _emscripten_glGetInteger64i_v(target, index, data) {
      emscriptenWebGLGetIndexed(target, index, data, 1)
    }
    function _emscripten_glGetInteger64v(name_, p) {
      emscriptenWebGLGet(name_, p, 1)
    }
    function _emscripten_glGetIntegeri_v(target, index, data) {
      emscriptenWebGLGetIndexed(target, index, data, 0)
    }
    function _emscripten_glGetIntegerv(name_, p) {
      emscriptenWebGLGet(name_, p, 0)
    }
    function _emscripten_glGetInternalformativ(target, internalformat, pname, bufSize, params) {
      if (bufSize < 0) {
        GL.recordError(1281)
        return
      }
      if (!params) {
        GL.recordError(1281)
        return
      }
      var ret = GLctx['getInternalformatParameter'](target, internalformat, pname)
      if (ret === null) return
      for (var i = 0; i < ret.length && i < bufSize; ++i) {
        HEAP32[(params + i * 4) >> 2] = ret[i]
      }
    }
    function _emscripten_glGetProgramBinary(program, bufSize, length, binaryFormat, binary) {
      GL.recordError(1282)
    }
    function _emscripten_glGetProgramInfoLog(program, maxLength, length, infoLog) {
      var log = GLctx.getProgramInfoLog(GL.programs[program])
      if (log === null) log = '(unknown error)'
      var numBytesWrittenExclNull = maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0
      if (length) HEAP32[length >> 2] = numBytesWrittenExclNull
    }
    function _emscripten_glGetProgramiv(program, pname, p) {
      if (!p) {
        GL.recordError(1281)
        return
      }
      if (program >= GL.programsCounter.x) {
        GL.recordError(1281)
        return
      }
      program = GL.programs[program]
      if (pname == 35716) {
        var log = GLctx.getProgramInfoLog(program)
        if (log === null) log = '(unknown error)'
        HEAP32[p >> 2] = log.length + 1
      } else if (pname == 35719) {
        if (!program.maxUniformLength) {
          for (var i = 0; i < GLctx.getProgramParameter(program, 35718); ++i) {
            program.maxUniformLength = Math.max(
              program.maxUniformLength,
              GLctx.getActiveUniform(program, i).name.length + 1
            )
          }
        }
        HEAP32[p >> 2] = program.maxUniformLength
      } else if (pname == 35722) {
        if (!program.maxAttributeLength) {
          for (var i = 0; i < GLctx.getProgramParameter(program, 35721); ++i) {
            program.maxAttributeLength = Math.max(
              program.maxAttributeLength,
              GLctx.getActiveAttrib(program, i).name.length + 1
            )
          }
        }
        HEAP32[p >> 2] = program.maxAttributeLength
      } else if (pname == 35381) {
        if (!program.maxUniformBlockNameLength) {
          for (var i = 0; i < GLctx.getProgramParameter(program, 35382); ++i) {
            program.maxUniformBlockNameLength = Math.max(
              program.maxUniformBlockNameLength,
              GLctx.getActiveUniformBlockName(program, i).length + 1
            )
          }
        }
        HEAP32[p >> 2] = program.maxUniformBlockNameLength
      } else {
        HEAP32[p >> 2] = GLctx.getProgramParameter(program, pname)
      }
    }
    function _emscripten_glGetQueryObjecti64vEXT(id, pname, params) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      var query = GL.queries[id]
      var param
      if (GL.currentContext.version < 2) {
        param = GLctx.disjointTimerQueryExt['getQueryObjectEXT'](query, pname)
      } else {
        param = GLctx['getQueryParameter'](query, pname)
      }
      var ret
      if (typeof param == 'boolean') {
        ret = param ? 1 : 0
      } else {
        ret = param
      }
      writeI53ToI64(params, ret)
    }
    function _emscripten_glGetQueryObjectivEXT(id, pname, params) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      var query = GL.queries[id]
      var param = GLctx.disjointTimerQueryExt['getQueryObjectEXT'](query, pname)
      var ret
      if (typeof param == 'boolean') {
        ret = param ? 1 : 0
      } else {
        ret = param
      }
      HEAP32[params >> 2] = ret
    }
    function _emscripten_glGetQueryObjectui64vEXT(id, pname, params) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      var query = GL.queries[id]
      var param
      if (GL.currentContext.version < 2) {
        param = GLctx.disjointTimerQueryExt['getQueryObjectEXT'](query, pname)
      } else {
        param = GLctx['getQueryParameter'](query, pname)
      }
      var ret
      if (typeof param == 'boolean') {
        ret = param ? 1 : 0
      } else {
        ret = param
      }
      writeI53ToI64(params, ret)
    }
    function _emscripten_glGetQueryObjectuiv(id, pname, params) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      var query = GL.queries[id]
      var param = GLctx['getQueryParameter'](query, pname)
      var ret
      if (typeof param == 'boolean') {
        ret = param ? 1 : 0
      } else {
        ret = param
      }
      HEAP32[params >> 2] = ret
    }
    function _emscripten_glGetQueryObjectuivEXT(id, pname, params) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      var query = GL.queries[id]
      var param = GLctx.disjointTimerQueryExt['getQueryObjectEXT'](query, pname)
      var ret
      if (typeof param == 'boolean') {
        ret = param ? 1 : 0
      } else {
        ret = param
      }
      HEAP32[params >> 2] = ret
    }
    function _emscripten_glGetQueryiv(target, pname, params) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      HEAP32[params >> 2] = GLctx['getQuery'](target, pname)
    }
    function _emscripten_glGetQueryivEXT(target, pname, params) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      HEAP32[params >> 2] = GLctx.disjointTimerQueryExt['getQueryEXT'](target, pname)
    }
    function _emscripten_glGetRenderbufferParameteriv(target, pname, params) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      HEAP32[params >> 2] = GLctx.getRenderbufferParameter(target, pname)
    }
    function _emscripten_glGetSamplerParameterfv(sampler, pname, params) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      HEAPF32[params >> 2] = GLctx['getSamplerParameter'](GL.samplers[sampler], pname)
    }
    function _emscripten_glGetSamplerParameteriv(sampler, pname, params) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      HEAP32[params >> 2] = GLctx['getSamplerParameter'](GL.samplers[sampler], pname)
    }
    function _emscripten_glGetShaderInfoLog(shader, maxLength, length, infoLog) {
      var log = GLctx.getShaderInfoLog(GL.shaders[shader])
      if (log === null) log = '(unknown error)'
      var numBytesWrittenExclNull = maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0
      if (length) HEAP32[length >> 2] = numBytesWrittenExclNull
    }
    function _emscripten_glGetShaderPrecisionFormat(shaderType, precisionType, range, precision) {
      var result = GLctx.getShaderPrecisionFormat(shaderType, precisionType)
      HEAP32[range >> 2] = result.rangeMin
      HEAP32[(range + 4) >> 2] = result.rangeMax
      HEAP32[precision >> 2] = result.precision
    }
    function _emscripten_glGetShaderSource(shader, bufSize, length, source) {
      var result = GLctx.getShaderSource(GL.shaders[shader])
      if (!result) return
      var numBytesWrittenExclNull = bufSize > 0 && source ? stringToUTF8(result, source, bufSize) : 0
      if (length) HEAP32[length >> 2] = numBytesWrittenExclNull
    }
    function _emscripten_glGetShaderiv(shader, pname, p) {
      if (!p) {
        GL.recordError(1281)
        return
      }
      if (pname == 35716) {
        var log = GLctx.getShaderInfoLog(GL.shaders[shader])
        if (log === null) log = '(unknown error)'
        var logLength = log ? log.length + 1 : 0
        HEAP32[p >> 2] = logLength
      } else if (pname == 35720) {
        var source = GLctx.getShaderSource(GL.shaders[shader])
        var sourceLength = source ? source.length + 1 : 0
        HEAP32[p >> 2] = sourceLength
      } else {
        HEAP32[p >> 2] = GLctx.getShaderParameter(GL.shaders[shader], pname)
      }
    }
    function stringToNewUTF8(jsString) {
      var length = lengthBytesUTF8(jsString) + 1
      var cString = _malloc(length)
      stringToUTF8(jsString, cString, length)
      return cString
    }
    function _emscripten_glGetString(name_) {
      var ret = GL.stringCache[name_]
      if (!ret) {
        switch (name_) {
          case 7939:
            var exts = GLctx.getSupportedExtensions() || []
            exts = exts.concat(
              exts.map(function (e) {
                return 'GL_' + e
              })
            )
            ret = stringToNewUTF8(exts.join(' '))
            break
          case 7936:
          case 7937:
          case 37445:
          case 37446:
            var s = GLctx.getParameter(name_)
            if (!s) {
              GL.recordError(1280)
            }
            ret = s && stringToNewUTF8(s)
            break
          case 7938:
            var glVersion = GLctx.getParameter(7938)
            if (true) glVersion = 'OpenGL ES 3.0 (' + glVersion + ')'
            else {
              glVersion = 'OpenGL ES 2.0 (' + glVersion + ')'
            }
            ret = stringToNewUTF8(glVersion)
            break
          case 35724:
            var glslVersion = GLctx.getParameter(35724)
            var ver_re = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/
            var ver_num = glslVersion.match(ver_re)
            if (ver_num !== null) {
              if (ver_num[1].length == 3) ver_num[1] = ver_num[1] + '0'
              glslVersion = 'OpenGL ES GLSL ES ' + ver_num[1] + ' (' + glslVersion + ')'
            }
            ret = stringToNewUTF8(glslVersion)
            break
          default:
            GL.recordError(1280)
        }
        GL.stringCache[name_] = ret
      }
      return ret
    }
    function _emscripten_glGetStringi(name, index) {
      if (GL.currentContext.version < 2) {
        GL.recordError(1282)
        return 0
      }
      var stringiCache = GL.stringiCache[name]
      if (stringiCache) {
        if (index < 0 || index >= stringiCache.length) {
          GL.recordError(1281)
          return 0
        }
        return stringiCache[index]
      }
      switch (name) {
        case 7939:
          var exts = GLctx.getSupportedExtensions() || []
          exts = exts.concat(
            exts.map(function (e) {
              return 'GL_' + e
            })
          )
          exts = exts.map(function (e) {
            return stringToNewUTF8(e)
          })
          stringiCache = GL.stringiCache[name] = exts
          if (index < 0 || index >= stringiCache.length) {
            GL.recordError(1281)
            return 0
          }
          return stringiCache[index]
        default:
          GL.recordError(1280)
          return 0
      }
    }
    function _emscripten_glGetSynciv(sync, pname, bufSize, length, values) {
      if (bufSize < 0) {
        GL.recordError(1281)
        return
      }
      if (!values) {
        GL.recordError(1281)
        return
      }
      var ret = GLctx.getSyncParameter(GL.syncs[sync], pname)
      if (ret !== null) {
        HEAP32[values >> 2] = ret
        if (length) HEAP32[length >> 2] = 1
      }
    }
    function _emscripten_glGetTexParameterfv(target, pname, params) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      HEAPF32[params >> 2] = GLctx.getTexParameter(target, pname)
    }
    function _emscripten_glGetTexParameteriv(target, pname, params) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      HEAP32[params >> 2] = GLctx.getTexParameter(target, pname)
    }
    function _emscripten_glGetTransformFeedbackVarying(program, index, bufSize, length, size, type, name) {
      program = GL.programs[program]
      var info = GLctx['getTransformFeedbackVarying'](program, index)
      if (!info) return
      if (name && bufSize > 0) {
        var numBytesWrittenExclNull = stringToUTF8(info.name, name, bufSize)
        if (length) HEAP32[length >> 2] = numBytesWrittenExclNull
      } else {
        if (length) HEAP32[length >> 2] = 0
      }
      if (size) HEAP32[size >> 2] = info.size
      if (type) HEAP32[type >> 2] = info.type
    }
    function _emscripten_glGetUniformBlockIndex(program, uniformBlockName) {
      return GLctx['getUniformBlockIndex'](GL.programs[program], UTF8ToString(uniformBlockName))
    }
    function _emscripten_glGetUniformIndices(program, uniformCount, uniformNames, uniformIndices) {
      if (!uniformIndices) {
        GL.recordError(1281)
        return
      }
      if (uniformCount > 0 && (uniformNames == 0 || uniformIndices == 0)) {
        GL.recordError(1281)
        return
      }
      program = GL.programs[program]
      var names = []
      for (var i = 0; i < uniformCount; i++) names.push(UTF8ToString(HEAP32[(uniformNames + i * 4) >> 2]))
      var result = GLctx['getUniformIndices'](program, names)
      if (!result) return
      var len = result.length
      for (var i = 0; i < len; i++) {
        HEAP32[(uniformIndices + i * 4) >> 2] = result[i]
      }
    }
    function jstoi_q(str) {
      return parseInt(str)
    }
    function webglGetLeftBracePos(name) {
      return name.slice(-1) == ']' && name.lastIndexOf('[')
    }
    function webglPrepareUniformLocationsBeforeFirstUse(program) {
      var uniformLocsById = program.uniformLocsById,
        uniformSizeAndIdsByName = program.uniformSizeAndIdsByName,
        i,
        j
      if (!uniformLocsById) {
        program.uniformLocsById = uniformLocsById = {}
        program.uniformArrayNamesById = {}
        for (i = 0; i < GLctx.getProgramParameter(program, 35718); ++i) {
          var u = GLctx.getActiveUniform(program, i)
          var nm = u.name
          var sz = u.size
          var lb = webglGetLeftBracePos(nm)
          var arrayName = lb > 0 ? nm.slice(0, lb) : nm
          var id = program.uniformIdCounter
          program.uniformIdCounter += sz
          uniformSizeAndIdsByName[arrayName] = [sz, id]
          for (j = 0; j < sz; ++j) {
            uniformLocsById[id] = j
            program.uniformArrayNamesById[id++] = arrayName
          }
        }
      }
    }
    function _emscripten_glGetUniformLocation(program, name) {
      name = UTF8ToString(name)
      if ((program = GL.programs[program])) {
        webglPrepareUniformLocationsBeforeFirstUse(program)
        var uniformLocsById = program.uniformLocsById
        var arrayIndex = 0
        var uniformBaseName = name
        var leftBrace = webglGetLeftBracePos(name)
        if (leftBrace > 0) {
          arrayIndex = jstoi_q(name.slice(leftBrace + 1)) >>> 0
          uniformBaseName = name.slice(0, leftBrace)
        }
        var sizeAndId = program.uniformSizeAndIdsByName[uniformBaseName]
        if (sizeAndId && arrayIndex < sizeAndId[0]) {
          arrayIndex += sizeAndId[1]
          if ((uniformLocsById[arrayIndex] = uniformLocsById[arrayIndex] || GLctx.getUniformLocation(program, name))) {
            return arrayIndex
          }
        }
      } else {
        GL.recordError(1281)
      }
      return -1
    }
    function webglGetUniformLocation(location) {
      var p = GLctx.currentProgram
      if (p) {
        var webglLoc = p.uniformLocsById[location]
        if (typeof webglLoc == 'number') {
          p.uniformLocsById[location] = webglLoc = GLctx.getUniformLocation(
            p,
            p.uniformArrayNamesById[location] + (webglLoc > 0 ? '[' + webglLoc + ']' : '')
          )
        }
        return webglLoc
      } else {
        GL.recordError(1282)
      }
    }
    function emscriptenWebGLGetUniform(program, location, params, type) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      program = GL.programs[program]
      webglPrepareUniformLocationsBeforeFirstUse(program)
      var data = GLctx.getUniform(program, webglGetUniformLocation(location))
      if (typeof data == 'number' || typeof data == 'boolean') {
        switch (type) {
          case 0:
            HEAP32[params >> 2] = data
            break
          case 2:
            HEAPF32[params >> 2] = data
            break
        }
      } else {
        for (var i = 0; i < data.length; i++) {
          switch (type) {
            case 0:
              HEAP32[(params + i * 4) >> 2] = data[i]
              break
            case 2:
              HEAPF32[(params + i * 4) >> 2] = data[i]
              break
          }
        }
      }
    }
    function _emscripten_glGetUniformfv(program, location, params) {
      emscriptenWebGLGetUniform(program, location, params, 2)
    }
    function _emscripten_glGetUniformiv(program, location, params) {
      emscriptenWebGLGetUniform(program, location, params, 0)
    }
    function _emscripten_glGetUniformuiv(program, location, params) {
      emscriptenWebGLGetUniform(program, location, params, 0)
    }
    function emscriptenWebGLGetVertexAttrib(index, pname, params, type) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      var data = GLctx.getVertexAttrib(index, pname)
      if (pname == 34975) {
        HEAP32[params >> 2] = data && data['name']
      } else if (typeof data == 'number' || typeof data == 'boolean') {
        switch (type) {
          case 0:
            HEAP32[params >> 2] = data
            break
          case 2:
            HEAPF32[params >> 2] = data
            break
          case 5:
            HEAP32[params >> 2] = Math.fround(data)
            break
        }
      } else {
        for (var i = 0; i < data.length; i++) {
          switch (type) {
            case 0:
              HEAP32[(params + i * 4) >> 2] = data[i]
              break
            case 2:
              HEAPF32[(params + i * 4) >> 2] = data[i]
              break
            case 5:
              HEAP32[(params + i * 4) >> 2] = Math.fround(data[i])
              break
          }
        }
      }
    }
    function _emscripten_glGetVertexAttribIiv(index, pname, params) {
      emscriptenWebGLGetVertexAttrib(index, pname, params, 0)
    }
    function _emscripten_glGetVertexAttribIuiv(index, pname, params) {
      emscriptenWebGLGetVertexAttrib(index, pname, params, 0)
    }
    function _emscripten_glGetVertexAttribPointerv(index, pname, pointer) {
      if (!pointer) {
        GL.recordError(1281)
        return
      }
      HEAP32[pointer >> 2] = GLctx.getVertexAttribOffset(index, pname)
    }
    function _emscripten_glGetVertexAttribfv(index, pname, params) {
      emscriptenWebGLGetVertexAttrib(index, pname, params, 2)
    }
    function _emscripten_glGetVertexAttribiv(index, pname, params) {
      emscriptenWebGLGetVertexAttrib(index, pname, params, 5)
    }
    function _emscripten_glHint(x0, x1) {
      GLctx['hint'](x0, x1)
    }
    function _emscripten_glInvalidateFramebuffer(target, numAttachments, attachments) {
      var list = tempFixedLengthArray[numAttachments]
      for (var i = 0; i < numAttachments; i++) {
        list[i] = HEAP32[(attachments + i * 4) >> 2]
      }
      GLctx['invalidateFramebuffer'](target, list)
    }
    function _emscripten_glInvalidateSubFramebuffer(target, numAttachments, attachments, x, y, width, height) {
      var list = tempFixedLengthArray[numAttachments]
      for (var i = 0; i < numAttachments; i++) {
        list[i] = HEAP32[(attachments + i * 4) >> 2]
      }
      GLctx['invalidateSubFramebuffer'](target, list, x, y, width, height)
    }
    function _emscripten_glIsBuffer(buffer) {
      var b = GL.buffers[buffer]
      if (!b) return 0
      return GLctx.isBuffer(b)
    }
    function _emscripten_glIsEnabled(x0) {
      return GLctx['isEnabled'](x0)
    }
    function _emscripten_glIsFramebuffer(framebuffer) {
      var fb = GL.framebuffers[framebuffer]
      if (!fb) return 0
      return GLctx.isFramebuffer(fb)
    }
    function _emscripten_glIsProgram(program) {
      program = GL.programs[program]
      if (!program) return 0
      return GLctx.isProgram(program)
    }
    function _emscripten_glIsQuery(id) {
      var query = GL.queries[id]
      if (!query) return 0
      return GLctx['isQuery'](query)
    }
    function _emscripten_glIsQueryEXT(id) {
      var query = GL.queries[id]
      if (!query) return 0
      return GLctx.disjointTimerQueryExt['isQueryEXT'](query)
    }
    function _emscripten_glIsRenderbuffer(renderbuffer) {
      var rb = GL.renderbuffers[renderbuffer]
      if (!rb) return 0
      return GLctx.isRenderbuffer(rb)
    }
    function _emscripten_glIsSampler(id) {
      var sampler = GL.samplers[id]
      if (!sampler) return 0
      return GLctx['isSampler'](sampler)
    }
    function _emscripten_glIsShader(shader) {
      var s = GL.shaders[shader]
      if (!s) return 0
      return GLctx.isShader(s)
    }
    function _emscripten_glIsSync(sync) {
      return GLctx.isSync(GL.syncs[sync])
    }
    function _emscripten_glIsTexture(id) {
      var texture = GL.textures[id]
      if (!texture) return 0
      return GLctx.isTexture(texture)
    }
    function _emscripten_glIsTransformFeedback(id) {
      return GLctx['isTransformFeedback'](GL.transformFeedbacks[id])
    }
    function _emscripten_glIsVertexArray(array) {
      var vao = GL.vaos[array]
      if (!vao) return 0
      return GLctx['isVertexArray'](vao)
    }
    function _emscripten_glIsVertexArrayOES(array) {
      var vao = GL.vaos[array]
      if (!vao) return 0
      return GLctx['isVertexArray'](vao)
    }
    function _emscripten_glLineWidth(x0) {
      GLctx['lineWidth'](x0)
    }
    function _emscripten_glLinkProgram(program) {
      program = GL.programs[program]
      GLctx.linkProgram(program)
      program.uniformLocsById = 0
      program.uniformSizeAndIdsByName = {}
    }
    function _emscripten_glPauseTransformFeedback() {
      GLctx['pauseTransformFeedback']()
    }
    function _emscripten_glPixelStorei(pname, param) {
      if (pname == 3317) {
        GL.unpackAlignment = param
      }
      GLctx.pixelStorei(pname, param)
    }
    function _emscripten_glPolygonOffset(x0, x1) {
      GLctx['polygonOffset'](x0, x1)
    }
    function _emscripten_glProgramBinary(program, binaryFormat, binary, length) {
      GL.recordError(1280)
    }
    function _emscripten_glProgramParameteri(program, pname, value) {
      GL.recordError(1280)
    }
    function _emscripten_glQueryCounterEXT(id, target) {
      GLctx.disjointTimerQueryExt['queryCounterEXT'](GL.queries[id], target)
    }
    function _emscripten_glReadBuffer(x0) {
      GLctx['readBuffer'](x0)
    }
    function computeUnpackAlignedImageSize(width, height, sizePerPixel, alignment) {
      function roundedToNextMultipleOf(x, y) {
        return (x + y - 1) & -y
      }
      var plainRowSize = width * sizePerPixel
      var alignedRowSize = roundedToNextMultipleOf(plainRowSize, alignment)
      return height * alignedRowSize
    }
    function __colorChannelsInGlTextureFormat(format) {
      var colorChannels = { 5: 3, 6: 4, 8: 2, 29502: 3, 29504: 4, 26917: 2, 26918: 2, 29846: 3, 29847: 4 }
      return colorChannels[format - 6402] || 1
    }
    function heapObjectForWebGLType(type) {
      type -= 5120
      if (type == 0) return HEAP8
      if (type == 1) return HEAPU8
      if (type == 2) return HEAP16
      if (type == 4) return HEAP32
      if (type == 6) return HEAPF32
      if (type == 5 || type == 28922 || type == 28520 || type == 30779 || type == 30782) return HEAPU32
      return HEAPU16
    }
    function heapAccessShiftForWebGLHeap(heap) {
      return 31 - Math.clz32(heap.BYTES_PER_ELEMENT)
    }
    function emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) {
      var heap = heapObjectForWebGLType(type)
      var shift = heapAccessShiftForWebGLHeap(heap)
      var byteSize = 1 << shift
      var sizePerPixel = __colorChannelsInGlTextureFormat(format) * byteSize
      var bytes = computeUnpackAlignedImageSize(width, height, sizePerPixel, GL.unpackAlignment)
      return heap.subarray(pixels >> shift, (pixels + bytes) >> shift)
    }
    function _emscripten_glReadPixels(x, y, width, height, format, type, pixels) {
      if (true) {
        if (GLctx.currentPixelPackBufferBinding) {
          GLctx.readPixels(x, y, width, height, format, type, pixels)
        } else {
          var heap = heapObjectForWebGLType(type)
          GLctx.readPixels(x, y, width, height, format, type, heap, pixels >> heapAccessShiftForWebGLHeap(heap))
        }
        return
      }
      var pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, format)
      if (!pixelData) {
        GL.recordError(1280)
        return
      }
      GLctx.readPixels(x, y, width, height, format, type, pixelData)
    }
    function _emscripten_glReleaseShaderCompiler() {}
    function _emscripten_glRenderbufferStorage(x0, x1, x2, x3) {
      GLctx['renderbufferStorage'](x0, x1, x2, x3)
    }
    function _emscripten_glRenderbufferStorageMultisample(x0, x1, x2, x3, x4) {
      GLctx['renderbufferStorageMultisample'](x0, x1, x2, x3, x4)
    }
    function _emscripten_glResumeTransformFeedback() {
      GLctx['resumeTransformFeedback']()
    }
    function _emscripten_glSampleCoverage(value, invert) {
      GLctx.sampleCoverage(value, !!invert)
    }
    function _emscripten_glSamplerParameterf(sampler, pname, param) {
      GLctx['samplerParameterf'](GL.samplers[sampler], pname, param)
    }
    function _emscripten_glSamplerParameterfv(sampler, pname, params) {
      var param = HEAPF32[params >> 2]
      GLctx['samplerParameterf'](GL.samplers[sampler], pname, param)
    }
    function _emscripten_glSamplerParameteri(sampler, pname, param) {
      GLctx['samplerParameteri'](GL.samplers[sampler], pname, param)
    }
    function _emscripten_glSamplerParameteriv(sampler, pname, params) {
      var param = HEAP32[params >> 2]
      GLctx['samplerParameteri'](GL.samplers[sampler], pname, param)
    }
    function _emscripten_glScissor(x0, x1, x2, x3) {
      GLctx['scissor'](x0, x1, x2, x3)
    }
    function _emscripten_glShaderBinary() {
      GL.recordError(1280)
    }
    function _emscripten_glShaderSource(shader, count, string, length) {
      var source = GL.getSource(shader, count, string, length)
      GLctx.shaderSource(GL.shaders[shader], source)
    }
    function _emscripten_glStencilFunc(x0, x1, x2) {
      GLctx['stencilFunc'](x0, x1, x2)
    }
    function _emscripten_glStencilFuncSeparate(x0, x1, x2, x3) {
      GLctx['stencilFuncSeparate'](x0, x1, x2, x3)
    }
    function _emscripten_glStencilMask(x0) {
      GLctx['stencilMask'](x0)
    }
    function _emscripten_glStencilMaskSeparate(x0, x1) {
      GLctx['stencilMaskSeparate'](x0, x1)
    }
    function _emscripten_glStencilOp(x0, x1, x2) {
      GLctx['stencilOp'](x0, x1, x2)
    }
    function _emscripten_glStencilOpSeparate(x0, x1, x2, x3) {
      GLctx['stencilOpSeparate'](x0, x1, x2, x3)
    }
    function _emscripten_glTexImage2D(target, level, internalFormat, width, height, border, format, type, pixels) {
      if (true) {
        if (GLctx.currentPixelUnpackBufferBinding) {
          GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels)
        } else if (pixels) {
          var heap = heapObjectForWebGLType(type)
          GLctx.texImage2D(
            target,
            level,
            internalFormat,
            width,
            height,
            border,
            format,
            type,
            heap,
            pixels >> heapAccessShiftForWebGLHeap(heap)
          )
        } else {
          GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, null)
        }
        return
      }
      GLctx.texImage2D(
        target,
        level,
        internalFormat,
        width,
        height,
        border,
        format,
        type,
        pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) : null
      )
    }
    function _emscripten_glTexImage3D(
      target,
      level,
      internalFormat,
      width,
      height,
      depth,
      border,
      format,
      type,
      pixels
    ) {
      if (GLctx.currentPixelUnpackBufferBinding) {
        GLctx['texImage3D'](target, level, internalFormat, width, height, depth, border, format, type, pixels)
      } else if (pixels) {
        var heap = heapObjectForWebGLType(type)
        GLctx['texImage3D'](
          target,
          level,
          internalFormat,
          width,
          height,
          depth,
          border,
          format,
          type,
          heap,
          pixels >> heapAccessShiftForWebGLHeap(heap)
        )
      } else {
        GLctx['texImage3D'](target, level, internalFormat, width, height, depth, border, format, type, null)
      }
    }
    function _emscripten_glTexParameterf(x0, x1, x2) {
      GLctx['texParameterf'](x0, x1, x2)
    }
    function _emscripten_glTexParameterfv(target, pname, params) {
      var param = HEAPF32[params >> 2]
      GLctx.texParameterf(target, pname, param)
    }
    function _emscripten_glTexParameteri(x0, x1, x2) {
      GLctx['texParameteri'](x0, x1, x2)
    }
    function _emscripten_glTexParameteriv(target, pname, params) {
      var param = HEAP32[params >> 2]
      GLctx.texParameteri(target, pname, param)
    }
    function _emscripten_glTexStorage2D(x0, x1, x2, x3, x4) {
      GLctx['texStorage2D'](x0, x1, x2, x3, x4)
    }
    function _emscripten_glTexStorage3D(x0, x1, x2, x3, x4, x5) {
      GLctx['texStorage3D'](x0, x1, x2, x3, x4, x5)
    }
    function _emscripten_glTexSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels) {
      if (true) {
        if (GLctx.currentPixelUnpackBufferBinding) {
          GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels)
        } else if (pixels) {
          var heap = heapObjectForWebGLType(type)
          GLctx.texSubImage2D(
            target,
            level,
            xoffset,
            yoffset,
            width,
            height,
            format,
            type,
            heap,
            pixels >> heapAccessShiftForWebGLHeap(heap)
          )
        } else {
          GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, null)
        }
        return
      }
      var pixelData = null
      if (pixels) pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, 0)
      GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixelData)
    }
    function _emscripten_glTexSubImage3D(
      target,
      level,
      xoffset,
      yoffset,
      zoffset,
      width,
      height,
      depth,
      format,
      type,
      pixels
    ) {
      if (GLctx.currentPixelUnpackBufferBinding) {
        GLctx['texSubImage3D'](target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, pixels)
      } else if (pixels) {
        var heap = heapObjectForWebGLType(type)
        GLctx['texSubImage3D'](
          target,
          level,
          xoffset,
          yoffset,
          zoffset,
          width,
          height,
          depth,
          format,
          type,
          heap,
          pixels >> heapAccessShiftForWebGLHeap(heap)
        )
      } else {
        GLctx['texSubImage3D'](target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, null)
      }
    }
    function _emscripten_glTransformFeedbackVaryings(program, count, varyings, bufferMode) {
      program = GL.programs[program]
      var vars = []
      for (var i = 0; i < count; i++) vars.push(UTF8ToString(HEAP32[(varyings + i * 4) >> 2]))
      GLctx['transformFeedbackVaryings'](program, vars, bufferMode)
    }
    function _emscripten_glUniform1f(location, v0) {
      GLctx.uniform1f(webglGetUniformLocation(location), v0)
    }
    function _emscripten_glUniform1fv(location, count, value) {
      count && GLctx.uniform1fv(webglGetUniformLocation(location), HEAPF32, value >> 2, count)
    }
    function _emscripten_glUniform1i(location, v0) {
      GLctx.uniform1i(webglGetUniformLocation(location), v0)
    }
    function _emscripten_glUniform1iv(location, count, value) {
      count && GLctx.uniform1iv(webglGetUniformLocation(location), HEAP32, value >> 2, count)
    }
    function _emscripten_glUniform1ui(location, v0) {
      GLctx.uniform1ui(webglGetUniformLocation(location), v0)
    }
    function _emscripten_glUniform1uiv(location, count, value) {
      count && GLctx.uniform1uiv(webglGetUniformLocation(location), HEAPU32, value >> 2, count)
    }
    function _emscripten_glUniform2f(location, v0, v1) {
      GLctx.uniform2f(webglGetUniformLocation(location), v0, v1)
    }
    function _emscripten_glUniform2fv(location, count, value) {
      count && GLctx.uniform2fv(webglGetUniformLocation(location), HEAPF32, value >> 2, count * 2)
    }
    function _emscripten_glUniform2i(location, v0, v1) {
      GLctx.uniform2i(webglGetUniformLocation(location), v0, v1)
    }
    function _emscripten_glUniform2iv(location, count, value) {
      count && GLctx.uniform2iv(webglGetUniformLocation(location), HEAP32, value >> 2, count * 2)
    }
    function _emscripten_glUniform2ui(location, v0, v1) {
      GLctx.uniform2ui(webglGetUniformLocation(location), v0, v1)
    }
    function _emscripten_glUniform2uiv(location, count, value) {
      count && GLctx.uniform2uiv(webglGetUniformLocation(location), HEAPU32, value >> 2, count * 2)
    }
    function _emscripten_glUniform3f(location, v0, v1, v2) {
      GLctx.uniform3f(webglGetUniformLocation(location), v0, v1, v2)
    }
    function _emscripten_glUniform3fv(location, count, value) {
      count && GLctx.uniform3fv(webglGetUniformLocation(location), HEAPF32, value >> 2, count * 3)
    }
    function _emscripten_glUniform3i(location, v0, v1, v2) {
      GLctx.uniform3i(webglGetUniformLocation(location), v0, v1, v2)
    }
    function _emscripten_glUniform3iv(location, count, value) {
      count && GLctx.uniform3iv(webglGetUniformLocation(location), HEAP32, value >> 2, count * 3)
    }
    function _emscripten_glUniform3ui(location, v0, v1, v2) {
      GLctx.uniform3ui(webglGetUniformLocation(location), v0, v1, v2)
    }
    function _emscripten_glUniform3uiv(location, count, value) {
      count && GLctx.uniform3uiv(webglGetUniformLocation(location), HEAPU32, value >> 2, count * 3)
    }
    function _emscripten_glUniform4f(location, v0, v1, v2, v3) {
      GLctx.uniform4f(webglGetUniformLocation(location), v0, v1, v2, v3)
    }
    function _emscripten_glUniform4fv(location, count, value) {
      count && GLctx.uniform4fv(webglGetUniformLocation(location), HEAPF32, value >> 2, count * 4)
    }
    function _emscripten_glUniform4i(location, v0, v1, v2, v3) {
      GLctx.uniform4i(webglGetUniformLocation(location), v0, v1, v2, v3)
    }
    function _emscripten_glUniform4iv(location, count, value) {
      count && GLctx.uniform4iv(webglGetUniformLocation(location), HEAP32, value >> 2, count * 4)
    }
    function _emscripten_glUniform4ui(location, v0, v1, v2, v3) {
      GLctx.uniform4ui(webglGetUniformLocation(location), v0, v1, v2, v3)
    }
    function _emscripten_glUniform4uiv(location, count, value) {
      count && GLctx.uniform4uiv(webglGetUniformLocation(location), HEAPU32, value >> 2, count * 4)
    }
    function _emscripten_glUniformBlockBinding(program, uniformBlockIndex, uniformBlockBinding) {
      program = GL.programs[program]
      GLctx['uniformBlockBinding'](program, uniformBlockIndex, uniformBlockBinding)
    }
    function _emscripten_glUniformMatrix2fv(location, count, transpose, value) {
      count && GLctx.uniformMatrix2fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 4)
    }
    function _emscripten_glUniformMatrix2x3fv(location, count, transpose, value) {
      count && GLctx.uniformMatrix2x3fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 6)
    }
    function _emscripten_glUniformMatrix2x4fv(location, count, transpose, value) {
      count && GLctx.uniformMatrix2x4fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 8)
    }
    function _emscripten_glUniformMatrix3fv(location, count, transpose, value) {
      count && GLctx.uniformMatrix3fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 9)
    }
    function _emscripten_glUniformMatrix3x2fv(location, count, transpose, value) {
      count && GLctx.uniformMatrix3x2fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 6)
    }
    function _emscripten_glUniformMatrix3x4fv(location, count, transpose, value) {
      count && GLctx.uniformMatrix3x4fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 12)
    }
    function _emscripten_glUniformMatrix4fv(location, count, transpose, value) {
      count && GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 16)
    }
    function _emscripten_glUniformMatrix4x2fv(location, count, transpose, value) {
      count && GLctx.uniformMatrix4x2fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 8)
    }
    function _emscripten_glUniformMatrix4x3fv(location, count, transpose, value) {
      count && GLctx.uniformMatrix4x3fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 12)
    }
    function _emscripten_glUseProgram(program) {
      program = GL.programs[program]
      GLctx.useProgram(program)
      GLctx.currentProgram = program
    }
    function _emscripten_glValidateProgram(program) {
      GLctx.validateProgram(GL.programs[program])
    }
    function _emscripten_glVertexAttrib1f(x0, x1) {
      GLctx['vertexAttrib1f'](x0, x1)
    }
    function _emscripten_glVertexAttrib1fv(index, v) {
      GLctx.vertexAttrib1f(index, HEAPF32[v >> 2])
    }
    function _emscripten_glVertexAttrib2f(x0, x1, x2) {
      GLctx['vertexAttrib2f'](x0, x1, x2)
    }
    function _emscripten_glVertexAttrib2fv(index, v) {
      GLctx.vertexAttrib2f(index, HEAPF32[v >> 2], HEAPF32[(v + 4) >> 2])
    }
    function _emscripten_glVertexAttrib3f(x0, x1, x2, x3) {
      GLctx['vertexAttrib3f'](x0, x1, x2, x3)
    }
    function _emscripten_glVertexAttrib3fv(index, v) {
      GLctx.vertexAttrib3f(index, HEAPF32[v >> 2], HEAPF32[(v + 4) >> 2], HEAPF32[(v + 8) >> 2])
    }
    function _emscripten_glVertexAttrib4f(x0, x1, x2, x3, x4) {
      GLctx['vertexAttrib4f'](x0, x1, x2, x3, x4)
    }
    function _emscripten_glVertexAttrib4fv(index, v) {
      GLctx.vertexAttrib4f(index, HEAPF32[v >> 2], HEAPF32[(v + 4) >> 2], HEAPF32[(v + 8) >> 2], HEAPF32[(v + 12) >> 2])
    }
    function _emscripten_glVertexAttribDivisor(index, divisor) {
      GLctx['vertexAttribDivisor'](index, divisor)
    }
    function _emscripten_glVertexAttribDivisorANGLE(index, divisor) {
      GLctx['vertexAttribDivisor'](index, divisor)
    }
    function _emscripten_glVertexAttribDivisorARB(index, divisor) {
      GLctx['vertexAttribDivisor'](index, divisor)
    }
    function _emscripten_glVertexAttribDivisorEXT(index, divisor) {
      GLctx['vertexAttribDivisor'](index, divisor)
    }
    function _emscripten_glVertexAttribDivisorNV(index, divisor) {
      GLctx['vertexAttribDivisor'](index, divisor)
    }
    function _emscripten_glVertexAttribI4i(x0, x1, x2, x3, x4) {
      GLctx['vertexAttribI4i'](x0, x1, x2, x3, x4)
    }
    function _emscripten_glVertexAttribI4iv(index, v) {
      GLctx.vertexAttribI4i(index, HEAP32[v >> 2], HEAP32[(v + 4) >> 2], HEAP32[(v + 8) >> 2], HEAP32[(v + 12) >> 2])
    }
    function _emscripten_glVertexAttribI4ui(x0, x1, x2, x3, x4) {
      GLctx['vertexAttribI4ui'](x0, x1, x2, x3, x4)
    }
    function _emscripten_glVertexAttribI4uiv(index, v) {
      GLctx.vertexAttribI4ui(
        index,
        HEAPU32[v >> 2],
        HEAPU32[(v + 4) >> 2],
        HEAPU32[(v + 8) >> 2],
        HEAPU32[(v + 12) >> 2]
      )
    }
    function _emscripten_glVertexAttribIPointer(index, size, type, stride, ptr) {
      GLctx['vertexAttribIPointer'](index, size, type, stride, ptr)
    }
    function _emscripten_glVertexAttribPointer(index, size, type, normalized, stride, ptr) {
      GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr)
    }
    function _emscripten_glViewport(x0, x1, x2, x3) {
      GLctx['viewport'](x0, x1, x2, x3)
    }
    function _emscripten_glWaitSync(sync, flags, timeout_low, timeout_high) {
      var timeout = convertI32PairToI53(timeout_low, timeout_high)
      GLctx.waitSync(GL.syncs[sync], flags, timeout)
    }
    function _emscripten_has_asyncify() {
      return 0
    }
    function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.copyWithin(dest, src, src + num)
    }
    function doRequestFullscreen(target, strategy) {
      if (!JSEvents.fullscreenEnabled()) return -1
      target = findEventTarget(target)
      if (!target) return -4
      if (!target.requestFullscreen && !target.webkitRequestFullscreen) {
        return -3
      }
      var canPerformRequests = JSEvents.canPerformEventHandlerRequests()
      if (!canPerformRequests) {
        if (strategy.deferUntilInEventHandler) {
          JSEvents.deferCall(JSEvents_requestFullscreen, 1, [target, strategy])
          return 1
        }
        return -2
      }
      return JSEvents_requestFullscreen(target, strategy)
    }
    function _emscripten_request_fullscreen_strategy(target, deferUntilInEventHandler, fullscreenStrategy) {
      var strategy = {
        scaleMode: HEAP32[fullscreenStrategy >> 2],
        canvasResolutionScaleMode: HEAP32[(fullscreenStrategy + 4) >> 2],
        filteringMode: HEAP32[(fullscreenStrategy + 8) >> 2],
        deferUntilInEventHandler: deferUntilInEventHandler,
        canvasResizedCallback: HEAP32[(fullscreenStrategy + 12) >> 2],
        canvasResizedCallbackUserData: HEAP32[(fullscreenStrategy + 16) >> 2]
      }
      return doRequestFullscreen(target, strategy)
    }
    function _emscripten_request_pointerlock(target, deferUntilInEventHandler) {
      target = findEventTarget(target)
      if (!target) return -4
      if (!target.requestPointerLock) {
        return -1
      }
      var canPerformRequests = JSEvents.canPerformEventHandlerRequests()
      if (!canPerformRequests) {
        if (deferUntilInEventHandler) {
          JSEvents.deferCall(requestPointerLock, 2, [target])
          return 1
        }
        return -2
      }
      return requestPointerLock(target)
    }
    function getHeapMax() {
      return 2147483648
    }
    function emscripten_realloc_buffer(size) {
      var b = wasmMemory.buffer
      try {
        wasmMemory.grow((size - b.byteLength + 65535) >>> 16)
        updateMemoryViews()
        return 1
      } catch (e) {}
    }
    function _emscripten_resize_heap(requestedSize) {
      var oldSize = HEAPU8.length
      requestedSize = requestedSize >>> 0
      var maxHeapSize = getHeapMax()
      if (requestedSize > maxHeapSize) {
        return false
      }
      let alignUp = (x, multiple) => x + ((multiple - (x % multiple)) % multiple)
      for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown)
        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296)
        var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536))
        var replacement = emscripten_realloc_buffer(newSize)
        if (replacement) {
          return true
        }
      }
      return false
    }
    function _emscripten_sample_gamepad_data() {
      return (JSEvents.lastGamepadState = navigator.getGamepads
        ? navigator.getGamepads()
        : navigator.webkitGetGamepads
          ? navigator.webkitGetGamepads()
          : null)
        ? 0
        : -1
    }
    function registerBeforeUnloadEventCallback(
      target,
      userData,
      useCapture,
      callbackfunc,
      eventTypeId,
      eventTypeString
    ) {
      var beforeUnloadEventHandlerFunc = function (e = event) {
        var confirmationMessage = getWasmTableEntry(callbackfunc)(eventTypeId, 0, userData)
        if (confirmationMessage) {
          confirmationMessage = UTF8ToString(confirmationMessage)
        }
        if (confirmationMessage) {
          e.preventDefault()
          e.returnValue = confirmationMessage
          return confirmationMessage
        }
      }
      var eventHandler = {
        target: findEventTarget(target),
        eventTypeString: eventTypeString,
        callbackfunc: callbackfunc,
        handlerFunc: beforeUnloadEventHandlerFunc,
        useCapture: useCapture
      }
      JSEvents.registerOrRemoveHandler(eventHandler)
    }
    function _emscripten_set_beforeunload_callback_on_thread(userData, callbackfunc, targetThread) {
      if (typeof onbeforeunload == 'undefined') return -1
      if (targetThread !== 1) return -5
      registerBeforeUnloadEventCallback(2, userData, true, callbackfunc, 28, 'beforeunload')
      return 0
    }
    function registerFocusEventCallback(
      target,
      userData,
      useCapture,
      callbackfunc,
      eventTypeId,
      eventTypeString,
      targetThread
    ) {
      if (!JSEvents.focusEvent) JSEvents.focusEvent = _malloc(256)
      var focusEventHandlerFunc = function (e = event) {
        var nodeName = JSEvents.getNodeNameForTarget(e.target)
        var id = e.target.id ? e.target.id : ''
        var focusEvent = JSEvents.focusEvent
        stringToUTF8(nodeName, focusEvent + 0, 128)
        stringToUTF8(id, focusEvent + 128, 128)
        if (getWasmTableEntry(callbackfunc)(eventTypeId, focusEvent, userData)) e.preventDefault()
      }
      var eventHandler = {
        target: findEventTarget(target),
        eventTypeString: eventTypeString,
        callbackfunc: callbackfunc,
        handlerFunc: focusEventHandlerFunc,
        useCapture: useCapture
      }
      JSEvents.registerOrRemoveHandler(eventHandler)
    }
    function _emscripten_set_blur_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      registerFocusEventCallback(target, userData, useCapture, callbackfunc, 12, 'blur', targetThread)
      return 0
    }
    function _emscripten_set_element_css_size(target, width, height) {
      target = findEventTarget(target)
      if (!target) return -4
      target.style.width = width + 'px'
      target.style.height = height + 'px'
      return 0
    }
    function _emscripten_set_focus_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      registerFocusEventCallback(target, userData, useCapture, callbackfunc, 13, 'focus', targetThread)
      return 0
    }
    function fillFullscreenChangeEventData(eventStruct) {
      var fullscreenElement =
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      var isFullscreen = !!fullscreenElement
      HEAP32[eventStruct >> 2] = isFullscreen
      HEAP32[(eventStruct + 4) >> 2] = JSEvents.fullscreenEnabled()
      var reportedElement = isFullscreen ? fullscreenElement : JSEvents.previousFullscreenElement
      var nodeName = JSEvents.getNodeNameForTarget(reportedElement)
      var id = reportedElement && reportedElement.id ? reportedElement.id : ''
      stringToUTF8(nodeName, eventStruct + 8, 128)
      stringToUTF8(id, eventStruct + 136, 128)
      HEAP32[(eventStruct + 264) >> 2] = reportedElement ? reportedElement.clientWidth : 0
      HEAP32[(eventStruct + 268) >> 2] = reportedElement ? reportedElement.clientHeight : 0
      HEAP32[(eventStruct + 272) >> 2] = screen.width
      HEAP32[(eventStruct + 276) >> 2] = screen.height
      if (isFullscreen) {
        JSEvents.previousFullscreenElement = fullscreenElement
      }
    }
    function registerFullscreenChangeEventCallback(
      target,
      userData,
      useCapture,
      callbackfunc,
      eventTypeId,
      eventTypeString,
      targetThread
    ) {
      if (!JSEvents.fullscreenChangeEvent) JSEvents.fullscreenChangeEvent = _malloc(280)
      var fullscreenChangeEventhandlerFunc = function (e = event) {
        var fullscreenChangeEvent = JSEvents.fullscreenChangeEvent
        fillFullscreenChangeEventData(fullscreenChangeEvent)
        if (getWasmTableEntry(callbackfunc)(eventTypeId, fullscreenChangeEvent, userData)) e.preventDefault()
      }
      var eventHandler = {
        target: target,
        eventTypeString: eventTypeString,
        callbackfunc: callbackfunc,
        handlerFunc: fullscreenChangeEventhandlerFunc,
        useCapture: useCapture
      }
      JSEvents.registerOrRemoveHandler(eventHandler)
    }
    function _emscripten_set_fullscreenchange_callback_on_thread(
      target,
      userData,
      useCapture,
      callbackfunc,
      targetThread
    ) {
      if (!JSEvents.fullscreenEnabled()) return -1
      target = findEventTarget(target)
      if (!target) return -4
      registerFullscreenChangeEventCallback(
        target,
        userData,
        useCapture,
        callbackfunc,
        19,
        'fullscreenchange',
        targetThread
      )
      registerFullscreenChangeEventCallback(
        target,
        userData,
        useCapture,
        callbackfunc,
        19,
        'webkitfullscreenchange',
        targetThread
      )
      return 0
    }
    function registerGamepadEventCallback(
      target,
      userData,
      useCapture,
      callbackfunc,
      eventTypeId,
      eventTypeString,
      targetThread
    ) {
      if (!JSEvents.gamepadEvent) JSEvents.gamepadEvent = _malloc(1432)
      var gamepadEventHandlerFunc = function (e = event) {
        var gamepadEvent = JSEvents.gamepadEvent
        fillGamepadEventData(gamepadEvent, e['gamepad'])
        if (getWasmTableEntry(callbackfunc)(eventTypeId, gamepadEvent, userData)) e.preventDefault()
      }
      var eventHandler = {
        target: findEventTarget(target),
        allowsDeferredCalls: true,
        eventTypeString: eventTypeString,
        callbackfunc: callbackfunc,
        handlerFunc: gamepadEventHandlerFunc,
        useCapture: useCapture
      }
      JSEvents.registerOrRemoveHandler(eventHandler)
    }
    function _emscripten_set_gamepadconnected_callback_on_thread(userData, useCapture, callbackfunc, targetThread) {
      if (!navigator.getGamepads && !navigator.webkitGetGamepads) return -1
      registerGamepadEventCallback(2, userData, useCapture, callbackfunc, 26, 'gamepadconnected', targetThread)
      return 0
    }
    function _emscripten_set_gamepaddisconnected_callback_on_thread(userData, useCapture, callbackfunc, targetThread) {
      if (!navigator.getGamepads && !navigator.webkitGetGamepads) return -1
      registerGamepadEventCallback(2, userData, useCapture, callbackfunc, 27, 'gamepaddisconnected', targetThread)
      return 0
    }
    function registerKeyEventCallback(
      target,
      userData,
      useCapture,
      callbackfunc,
      eventTypeId,
      eventTypeString,
      targetThread
    ) {
      if (!JSEvents.keyEvent) JSEvents.keyEvent = _malloc(176)
      var keyEventHandlerFunc = function (e) {
        var keyEventData = JSEvents.keyEvent
        HEAPF64[keyEventData >> 3] = e.timeStamp
        var idx = keyEventData >> 2
        HEAP32[idx + 2] = e.location
        HEAP32[idx + 3] = e.ctrlKey
        HEAP32[idx + 4] = e.shiftKey
        HEAP32[idx + 5] = e.altKey
        HEAP32[idx + 6] = e.metaKey
        HEAP32[idx + 7] = e.repeat
        HEAP32[idx + 8] = e.charCode
        HEAP32[idx + 9] = e.keyCode
        HEAP32[idx + 10] = e.which
        stringToUTF8(e.key || '', keyEventData + 44, 32)
        stringToUTF8(e.code || '', keyEventData + 76, 32)
        stringToUTF8(e.char || '', keyEventData + 108, 32)
        stringToUTF8(e.locale || '', keyEventData + 140, 32)
        if (getWasmTableEntry(callbackfunc)(eventTypeId, keyEventData, userData)) e.preventDefault()
      }
      var eventHandler = {
        target: findEventTarget(target),
        allowsDeferredCalls: true,
        eventTypeString: eventTypeString,
        callbackfunc: callbackfunc,
        handlerFunc: keyEventHandlerFunc,
        useCapture: useCapture
      }
      JSEvents.registerOrRemoveHandler(eventHandler)
    }
    function _emscripten_set_keydown_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      registerKeyEventCallback(target, userData, useCapture, callbackfunc, 2, 'keydown', targetThread)
      return 0
    }
    function _emscripten_set_keypress_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      registerKeyEventCallback(target, userData, useCapture, callbackfunc, 1, 'keypress', targetThread)
      return 0
    }
    function _emscripten_set_keyup_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      registerKeyEventCallback(target, userData, useCapture, callbackfunc, 3, 'keyup', targetThread)
      return 0
    }
    function _emscripten_set_main_loop_arg(func, arg, fps, simulateInfiniteLoop) {
      var browserIterationFunc = () => getWasmTableEntry(func)(arg)
      setMainLoop(browserIterationFunc, fps, simulateInfiniteLoop, arg)
    }
    function fillMouseEventData(eventStruct, e, target) {
      HEAPF64[eventStruct >> 3] = e.timeStamp
      var idx = eventStruct >> 2
      HEAP32[idx + 2] = e.screenX
      HEAP32[idx + 3] = e.screenY
      HEAP32[idx + 4] = e.clientX
      HEAP32[idx + 5] = e.clientY
      HEAP32[idx + 6] = e.ctrlKey
      HEAP32[idx + 7] = e.shiftKey
      HEAP32[idx + 8] = e.altKey
      HEAP32[idx + 9] = e.metaKey
      HEAP16[idx * 2 + 20] = e.button
      HEAP16[idx * 2 + 21] = e.buttons
      HEAP32[idx + 11] = e['movementX']
      HEAP32[idx + 12] = e['movementY']
      var rect = getBoundingClientRect(target)
      HEAP32[idx + 13] = e.clientX - rect.left
      HEAP32[idx + 14] = e.clientY - rect.top
    }
    function registerMouseEventCallback(
      target,
      userData,
      useCapture,
      callbackfunc,
      eventTypeId,
      eventTypeString,
      targetThread
    ) {
      if (!JSEvents.mouseEvent) JSEvents.mouseEvent = _malloc(72)
      target = findEventTarget(target)
      var mouseEventHandlerFunc = function (e = event) {
        fillMouseEventData(JSEvents.mouseEvent, e, target)
        if (getWasmTableEntry(callbackfunc)(eventTypeId, JSEvents.mouseEvent, userData)) e.preventDefault()
      }
      var eventHandler = {
        target: target,
        allowsDeferredCalls:
          eventTypeString != 'mousemove' && eventTypeString != 'mouseenter' && eventTypeString != 'mouseleave',
        eventTypeString: eventTypeString,
        callbackfunc: callbackfunc,
        handlerFunc: mouseEventHandlerFunc,
        useCapture: useCapture
      }
      JSEvents.registerOrRemoveHandler(eventHandler)
    }
    function _emscripten_set_mousedown_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 5, 'mousedown', targetThread)
      return 0
    }
    function _emscripten_set_mouseenter_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 33, 'mouseenter', targetThread)
      return 0
    }
    function _emscripten_set_mouseleave_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 34, 'mouseleave', targetThread)
      return 0
    }
    function _emscripten_set_mousemove_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 8, 'mousemove', targetThread)
      return 0
    }
    function _emscripten_set_mouseup_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 6, 'mouseup', targetThread)
      return 0
    }
    function fillPointerlockChangeEventData(eventStruct) {
      var pointerLockElement =
        document.pointerLockElement ||
        document.mozPointerLockElement ||
        document.webkitPointerLockElement ||
        document.msPointerLockElement
      var isPointerlocked = !!pointerLockElement
      HEAP32[eventStruct >> 2] = isPointerlocked
      var nodeName = JSEvents.getNodeNameForTarget(pointerLockElement)
      var id = pointerLockElement && pointerLockElement.id ? pointerLockElement.id : ''
      stringToUTF8(nodeName, eventStruct + 4, 128)
      stringToUTF8(id, eventStruct + 132, 128)
    }
    function registerPointerlockChangeEventCallback(
      target,
      userData,
      useCapture,
      callbackfunc,
      eventTypeId,
      eventTypeString,
      targetThread
    ) {
      if (!JSEvents.pointerlockChangeEvent) JSEvents.pointerlockChangeEvent = _malloc(260)
      var pointerlockChangeEventHandlerFunc = function (e = event) {
        var pointerlockChangeEvent = JSEvents.pointerlockChangeEvent
        fillPointerlockChangeEventData(pointerlockChangeEvent)
        if (getWasmTableEntry(callbackfunc)(eventTypeId, pointerlockChangeEvent, userData)) e.preventDefault()
      }
      var eventHandler = {
        target: target,
        eventTypeString: eventTypeString,
        callbackfunc: callbackfunc,
        handlerFunc: pointerlockChangeEventHandlerFunc,
        useCapture: useCapture
      }
      JSEvents.registerOrRemoveHandler(eventHandler)
    }
    function _emscripten_set_pointerlockchange_callback_on_thread(
      target,
      userData,
      useCapture,
      callbackfunc,
      targetThread
    ) {
      if (
        !document ||
        !document.body ||
        (!document.body.requestPointerLock &&
          !document.body.mozRequestPointerLock &&
          !document.body.webkitRequestPointerLock &&
          !document.body.msRequestPointerLock)
      ) {
        return -1
      }
      target = findEventTarget(target)
      if (!target) return -4
      registerPointerlockChangeEventCallback(
        target,
        userData,
        useCapture,
        callbackfunc,
        20,
        'pointerlockchange',
        targetThread
      )
      registerPointerlockChangeEventCallback(
        target,
        userData,
        useCapture,
        callbackfunc,
        20,
        'mozpointerlockchange',
        targetThread
      )
      registerPointerlockChangeEventCallback(
        target,
        userData,
        useCapture,
        callbackfunc,
        20,
        'webkitpointerlockchange',
        targetThread
      )
      registerPointerlockChangeEventCallback(
        target,
        userData,
        useCapture,
        callbackfunc,
        20,
        'mspointerlockchange',
        targetThread
      )
      return 0
    }
    function registerUiEventCallback(
      target,
      userData,
      useCapture,
      callbackfunc,
      eventTypeId,
      eventTypeString,
      targetThread
    ) {
      if (!JSEvents.uiEvent) JSEvents.uiEvent = _malloc(36)
      target = findEventTarget(target)
      var uiEventHandlerFunc = function (e = event) {
        if (e.target != target) {
          return
        }
        var b = document.body
        if (!b) {
          return
        }
        var uiEvent = JSEvents.uiEvent
        HEAP32[uiEvent >> 2] = e.detail
        HEAP32[(uiEvent + 4) >> 2] = b.clientWidth
        HEAP32[(uiEvent + 8) >> 2] = b.clientHeight
        HEAP32[(uiEvent + 12) >> 2] = innerWidth
        HEAP32[(uiEvent + 16) >> 2] = innerHeight
        HEAP32[(uiEvent + 20) >> 2] = outerWidth
        HEAP32[(uiEvent + 24) >> 2] = outerHeight
        HEAP32[(uiEvent + 28) >> 2] = pageXOffset
        HEAP32[(uiEvent + 32) >> 2] = pageYOffset
        if (getWasmTableEntry(callbackfunc)(eventTypeId, uiEvent, userData)) e.preventDefault()
      }
      var eventHandler = {
        target: target,
        eventTypeString: eventTypeString,
        callbackfunc: callbackfunc,
        handlerFunc: uiEventHandlerFunc,
        useCapture: useCapture
      }
      JSEvents.registerOrRemoveHandler(eventHandler)
    }
    function _emscripten_set_resize_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      registerUiEventCallback(target, userData, useCapture, callbackfunc, 10, 'resize', targetThread)
      return 0
    }
    function registerTouchEventCallback(
      target,
      userData,
      useCapture,
      callbackfunc,
      eventTypeId,
      eventTypeString,
      targetThread
    ) {
      if (!JSEvents.touchEvent) JSEvents.touchEvent = _malloc(1696)
      target = findEventTarget(target)
      var touchEventHandlerFunc = function (e) {
        var t,
          touches = {},
          et = e.touches
        for (var i = 0; i < et.length; ++i) {
          t = et[i]
          t.isChanged = t.onTarget = 0
          touches[t.identifier] = t
        }
        for (var i = 0; i < e.changedTouches.length; ++i) {
          t = e.changedTouches[i]
          t.isChanged = 1
          touches[t.identifier] = t
        }
        for (var i = 0; i < e.targetTouches.length; ++i) {
          touches[e.targetTouches[i].identifier].onTarget = 1
        }
        var touchEvent = JSEvents.touchEvent
        HEAPF64[touchEvent >> 3] = e.timeStamp
        var idx = touchEvent >> 2
        HEAP32[idx + 3] = e.ctrlKey
        HEAP32[idx + 4] = e.shiftKey
        HEAP32[idx + 5] = e.altKey
        HEAP32[idx + 6] = e.metaKey
        idx += 7
        var targetRect = getBoundingClientRect(target)
        var numTouches = 0
        for (var i in touches) {
          t = touches[i]
          HEAP32[idx + 0] = t.identifier
          HEAP32[idx + 1] = t.screenX
          HEAP32[idx + 2] = t.screenY
          HEAP32[idx + 3] = t.clientX
          HEAP32[idx + 4] = t.clientY
          HEAP32[idx + 5] = t.pageX
          HEAP32[idx + 6] = t.pageY
          HEAP32[idx + 7] = t.isChanged
          HEAP32[idx + 8] = t.onTarget
          HEAP32[idx + 9] = t.clientX - targetRect.left
          HEAP32[idx + 10] = t.clientY - targetRect.top
          idx += 13
          if (++numTouches > 31) {
            break
          }
        }
        HEAP32[(touchEvent + 8) >> 2] = numTouches
        if (getWasmTableEntry(callbackfunc)(eventTypeId, touchEvent, userData)) e.preventDefault()
      }
      var eventHandler = {
        target: target,
        allowsDeferredCalls: eventTypeString == 'touchstart' || eventTypeString == 'touchend',
        eventTypeString: eventTypeString,
        callbackfunc: callbackfunc,
        handlerFunc: touchEventHandlerFunc,
        useCapture: useCapture
      }
      JSEvents.registerOrRemoveHandler(eventHandler)
    }
    function _emscripten_set_touchcancel_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      registerTouchEventCallback(target, userData, useCapture, callbackfunc, 25, 'touchcancel', targetThread)
      return 0
    }
    function _emscripten_set_touchend_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      registerTouchEventCallback(target, userData, useCapture, callbackfunc, 23, 'touchend', targetThread)
      return 0
    }
    function _emscripten_set_touchmove_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      registerTouchEventCallback(target, userData, useCapture, callbackfunc, 24, 'touchmove', targetThread)
      return 0
    }
    function _emscripten_set_touchstart_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      registerTouchEventCallback(target, userData, useCapture, callbackfunc, 22, 'touchstart', targetThread)
      return 0
    }
    function fillVisibilityChangeEventData(eventStruct) {
      var visibilityStates = ['hidden', 'visible', 'prerender', 'unloaded']
      var visibilityState = visibilityStates.indexOf(document.visibilityState)
      HEAP32[eventStruct >> 2] = document.hidden
      HEAP32[(eventStruct + 4) >> 2] = visibilityState
    }
    function registerVisibilityChangeEventCallback(
      target,
      userData,
      useCapture,
      callbackfunc,
      eventTypeId,
      eventTypeString,
      targetThread
    ) {
      if (!JSEvents.visibilityChangeEvent) JSEvents.visibilityChangeEvent = _malloc(8)
      var visibilityChangeEventHandlerFunc = function (e = event) {
        var visibilityChangeEvent = JSEvents.visibilityChangeEvent
        fillVisibilityChangeEventData(visibilityChangeEvent)
        if (getWasmTableEntry(callbackfunc)(eventTypeId, visibilityChangeEvent, userData)) e.preventDefault()
      }
      var eventHandler = {
        target: target,
        eventTypeString: eventTypeString,
        callbackfunc: callbackfunc,
        handlerFunc: visibilityChangeEventHandlerFunc,
        useCapture: useCapture
      }
      JSEvents.registerOrRemoveHandler(eventHandler)
    }
    function _emscripten_set_visibilitychange_callback_on_thread(userData, useCapture, callbackfunc, targetThread) {
      if (!specialHTMLTargets[1]) {
        return -4
      }
      registerVisibilityChangeEventCallback(
        specialHTMLTargets[1],
        userData,
        useCapture,
        callbackfunc,
        21,
        'visibilitychange',
        targetThread
      )
      return 0
    }
    function registerWheelEventCallback(
      target,
      userData,
      useCapture,
      callbackfunc,
      eventTypeId,
      eventTypeString,
      targetThread
    ) {
      if (!JSEvents.wheelEvent) JSEvents.wheelEvent = _malloc(104)
      var wheelHandlerFunc = function (e = event) {
        var wheelEvent = JSEvents.wheelEvent
        fillMouseEventData(wheelEvent, e, target)
        HEAPF64[(wheelEvent + 72) >> 3] = e['deltaX']
        HEAPF64[(wheelEvent + 80) >> 3] = e['deltaY']
        HEAPF64[(wheelEvent + 88) >> 3] = e['deltaZ']
        HEAP32[(wheelEvent + 96) >> 2] = e['deltaMode']
        if (getWasmTableEntry(callbackfunc)(eventTypeId, wheelEvent, userData)) e.preventDefault()
      }
      var eventHandler = {
        target: target,
        allowsDeferredCalls: true,
        eventTypeString: eventTypeString,
        callbackfunc: callbackfunc,
        handlerFunc: wheelHandlerFunc,
        useCapture: useCapture
      }
      JSEvents.registerOrRemoveHandler(eventHandler)
    }
    function _emscripten_set_wheel_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      target = findEventTarget(target)
      if (typeof target.onwheel != 'undefined') {
        registerWheelEventCallback(target, userData, useCapture, callbackfunc, 9, 'wheel', targetThread)
        return 0
      } else {
        return -1
      }
    }
    function _emscripten_sleep() {
      throw 'Please compile your program with async support in order to use asynchronous operations like emscripten_sleep'
    }
    var ENV = {}
    function getExecutableName() {
      return thisProgram || './this.program'
    }
    function getEnvStrings() {
      if (!getEnvStrings.strings) {
        var lang = 'C.UTF-8'
        var env = {
          USER: 'web_user',
          LOGNAME: 'web_user',
          PATH: '/',
          PWD: '/',
          HOME: '/home/web_user',
          LANG: lang,
          _: getExecutableName()
        }
        for (var x in ENV) {
          if (ENV[x] === undefined) delete env[x]
          else env[x] = ENV[x]
        }
        var strings = []
        for (var x in env) {
          strings.push(x + '=' + env[x])
        }
        getEnvStrings.strings = strings
      }
      return getEnvStrings.strings
    }
    function writeAsciiToMemory(str, buffer, dontAddNull) {
      for (var i = 0; i < str.length; ++i) {
        HEAP8[buffer++ >> 0] = str.charCodeAt(i)
      }
      if (!dontAddNull) HEAP8[buffer >> 0] = 0
    }
    function _environ_get(__environ, environ_buf) {
      var bufSize = 0
      getEnvStrings().forEach(function (string, i) {
        var ptr = environ_buf + bufSize
        HEAPU32[(__environ + i * 4) >> 2] = ptr
        writeAsciiToMemory(string, ptr)
        bufSize += string.length + 1
      })
      return 0
    }
    function _environ_sizes_get(penviron_count, penviron_buf_size) {
      var strings = getEnvStrings()
      HEAPU32[penviron_count >> 2] = strings.length
      var bufSize = 0
      strings.forEach(function (string) {
        bufSize += string.length + 1
      })
      HEAPU32[penviron_buf_size >> 2] = bufSize
      return 0
    }
    function _proc_exit(code) {
      EXITSTATUS = code
      if (!keepRuntimeAlive()) {
        if (Module['onExit']) Module['onExit'](code)
        ABORT = true
      }
      quit_(code, new ExitStatus(code))
    }
    function exitJS(status, implicit) {
      EXITSTATUS = status
      _proc_exit(status)
    }
    var _exit = exitJS
    function _fd_close(fd) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd)
        FS.close(stream)
        return 0
      } catch (e) {
        if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e
        return e.errno
      }
    }
    function _fd_fdstat_get(fd, pbuf) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd)
        var type = stream.tty ? 2 : FS.isDir(stream.mode) ? 3 : FS.isLink(stream.mode) ? 7 : 4
        HEAP8[pbuf >> 0] = type
        return 0
      } catch (e) {
        if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e
        return e.errno
      }
    }
    function doReadv(stream, iov, iovcnt, offset) {
      var ret = 0
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[iov >> 2]
        var len = HEAPU32[(iov + 4) >> 2]
        iov += 8
        var curr = FS.read(stream, HEAP8, ptr, len, offset)
        if (curr < 0) return -1
        ret += curr
        if (curr < len) break
        if (typeof offset !== 'undefined') {
          offset += curr
        }
      }
      return ret
    }
    function _fd_read(fd, iov, iovcnt, pnum) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd)
        var num = doReadv(stream, iov, iovcnt)
        HEAPU32[pnum >> 2] = num
        return 0
      } catch (e) {
        if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e
        return e.errno
      }
    }
    function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
      try {
        var offset = convertI32PairToI53Checked(offset_low, offset_high)
        if (isNaN(offset)) return 61
        var stream = SYSCALLS.getStreamFromFD(fd)
        FS.llseek(stream, offset, whence)
        ;(tempI64 = [
          stream.position >>> 0,
          ((tempDouble = stream.position),
          +Math.abs(tempDouble) >= 1
            ? tempDouble > 0
              ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0
              : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0
            : 0)
        ]),
          (HEAP32[newOffset >> 2] = tempI64[0]),
          (HEAP32[(newOffset + 4) >> 2] = tempI64[1])
        if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null
        return 0
      } catch (e) {
        if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e
        return e.errno
      }
    }
    function _fd_sync(fd) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd)
        if (stream.stream_ops && stream.stream_ops.fsync) {
          return stream.stream_ops.fsync(stream)
        }
        return 0
      } catch (e) {
        if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e
        return e.errno
      }
    }
    function doWritev(stream, iov, iovcnt, offset) {
      var ret = 0
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[iov >> 2]
        var len = HEAPU32[(iov + 4) >> 2]
        iov += 8
        var curr = FS.write(stream, HEAP8, ptr, len, offset)
        if (curr < 0) return -1
        ret += curr
        if (typeof offset !== 'undefined') {
          offset += curr
        }
      }
      return ret
    }
    function _fd_write(fd, iov, iovcnt, pnum) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd)
        var num = doWritev(stream, iov, iovcnt)
        HEAPU32[pnum >> 2] = num
        return 0
      } catch (e) {
        if (typeof FS == 'undefined' || !(e instanceof FS.ErrnoError)) throw e
        return e.errno
      }
    }
    function _glActiveTexture(x0) {
      GLctx['activeTexture'](x0)
    }
    function _glAttachShader(program, shader) {
      GLctx.attachShader(GL.programs[program], GL.shaders[shader])
    }
    function _glBeginQuery(target, id) {
      GLctx['beginQuery'](target, GL.queries[id])
    }
    function _glBeginTransformFeedback(x0) {
      GLctx['beginTransformFeedback'](x0)
    }
    function _glBindBuffer(target, buffer) {
      if (target == 35051) {
        GLctx.currentPixelPackBufferBinding = buffer
      } else if (target == 35052) {
        GLctx.currentPixelUnpackBufferBinding = buffer
      }
      GLctx.bindBuffer(target, GL.buffers[buffer])
    }
    function _glBindBufferBase(target, index, buffer) {
      GLctx['bindBufferBase'](target, index, GL.buffers[buffer])
    }
    function _glBindFramebuffer(target, framebuffer) {
      GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer])
    }
    function _glBindRenderbuffer(target, renderbuffer) {
      GLctx.bindRenderbuffer(target, GL.renderbuffers[renderbuffer])
    }
    function _glBindSampler(unit, sampler) {
      GLctx['bindSampler'](unit, GL.samplers[sampler])
    }
    function _glBindTexture(target, texture) {
      GLctx.bindTexture(target, GL.textures[texture])
    }
    function _glBindVertexArray(vao) {
      GLctx['bindVertexArray'](GL.vaos[vao])
    }
    function _glBlendColor(x0, x1, x2, x3) {
      GLctx['blendColor'](x0, x1, x2, x3)
    }
    function _glBlendEquation(x0) {
      GLctx['blendEquation'](x0)
    }
    function _glBlendEquationSeparate(x0, x1) {
      GLctx['blendEquationSeparate'](x0, x1)
    }
    function _glBlendFunc(x0, x1) {
      GLctx['blendFunc'](x0, x1)
    }
    function _glBlendFuncSeparate(x0, x1, x2, x3) {
      GLctx['blendFuncSeparate'](x0, x1, x2, x3)
    }
    function _glBlitFramebuffer(x0, x1, x2, x3, x4, x5, x6, x7, x8, x9) {
      GLctx['blitFramebuffer'](x0, x1, x2, x3, x4, x5, x6, x7, x8, x9)
    }
    function _glBufferData(target, size, data, usage) {
      if (true) {
        if (data && size) {
          GLctx.bufferData(target, HEAPU8, usage, data, size)
        } else {
          GLctx.bufferData(target, size, usage)
        }
      } else {
        GLctx.bufferData(target, data ? HEAPU8.subarray(data, data + size) : size, usage)
      }
    }
    function _glBufferSubData(target, offset, size, data) {
      if (true) {
        size && GLctx.bufferSubData(target, offset, HEAPU8, data, size)
        return
      }
      GLctx.bufferSubData(target, offset, HEAPU8.subarray(data, data + size))
    }
    function _glCheckFramebufferStatus(x0) {
      return GLctx['checkFramebufferStatus'](x0)
    }
    function _glClear(x0) {
      GLctx['clear'](x0)
    }
    function _glClearColor(x0, x1, x2, x3) {
      GLctx['clearColor'](x0, x1, x2, x3)
    }
    function _glClearDepthf(x0) {
      GLctx['clearDepth'](x0)
    }
    function _glClearStencil(x0) {
      GLctx['clearStencil'](x0)
    }
    function _glClientWaitSync(sync, flags, timeout_low, timeout_high) {
      var timeout = convertI32PairToI53(timeout_low, timeout_high)
      return GLctx.clientWaitSync(GL.syncs[sync], flags, timeout)
    }
    function _glColorMask(red, green, blue, alpha) {
      GLctx.colorMask(!!red, !!green, !!blue, !!alpha)
    }
    function _glCompileShader(shader) {
      GLctx.compileShader(GL.shaders[shader])
    }
    function _glCompressedTexImage2D(target, level, internalFormat, width, height, border, imageSize, data) {
      if (true) {
        if (GLctx.currentPixelUnpackBufferBinding || !imageSize) {
          GLctx['compressedTexImage2D'](target, level, internalFormat, width, height, border, imageSize, data)
        } else {
          GLctx['compressedTexImage2D'](target, level, internalFormat, width, height, border, HEAPU8, data, imageSize)
        }
        return
      }
      GLctx['compressedTexImage2D'](
        target,
        level,
        internalFormat,
        width,
        height,
        border,
        data ? HEAPU8.subarray(data, data + imageSize) : null
      )
    }
    function _glCompressedTexImage3D(target, level, internalFormat, width, height, depth, border, imageSize, data) {
      if (GLctx.currentPixelUnpackBufferBinding) {
        GLctx['compressedTexImage3D'](target, level, internalFormat, width, height, depth, border, imageSize, data)
      } else {
        GLctx['compressedTexImage3D'](
          target,
          level,
          internalFormat,
          width,
          height,
          depth,
          border,
          HEAPU8,
          data,
          imageSize
        )
      }
    }
    function _glCompressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, imageSize, data) {
      if (true) {
        if (GLctx.currentPixelUnpackBufferBinding || !imageSize) {
          GLctx['compressedTexSubImage2D'](target, level, xoffset, yoffset, width, height, format, imageSize, data)
        } else {
          GLctx['compressedTexSubImage2D'](
            target,
            level,
            xoffset,
            yoffset,
            width,
            height,
            format,
            HEAPU8,
            data,
            imageSize
          )
        }
        return
      }
      GLctx['compressedTexSubImage2D'](
        target,
        level,
        xoffset,
        yoffset,
        width,
        height,
        format,
        data ? HEAPU8.subarray(data, data + imageSize) : null
      )
    }
    function _glCompressedTexSubImage3D(
      target,
      level,
      xoffset,
      yoffset,
      zoffset,
      width,
      height,
      depth,
      format,
      imageSize,
      data
    ) {
      if (GLctx.currentPixelUnpackBufferBinding) {
        GLctx['compressedTexSubImage3D'](
          target,
          level,
          xoffset,
          yoffset,
          zoffset,
          width,
          height,
          depth,
          format,
          imageSize,
          data
        )
      } else {
        GLctx['compressedTexSubImage3D'](
          target,
          level,
          xoffset,
          yoffset,
          zoffset,
          width,
          height,
          depth,
          format,
          HEAPU8,
          data,
          imageSize
        )
      }
    }
    function _glCopyBufferSubData(x0, x1, x2, x3, x4) {
      GLctx['copyBufferSubData'](x0, x1, x2, x3, x4)
    }
    function _glCopyTexSubImage2D(x0, x1, x2, x3, x4, x5, x6, x7) {
      GLctx['copyTexSubImage2D'](x0, x1, x2, x3, x4, x5, x6, x7)
    }
    function _glCopyTexSubImage3D(x0, x1, x2, x3, x4, x5, x6, x7, x8) {
      GLctx['copyTexSubImage3D'](x0, x1, x2, x3, x4, x5, x6, x7, x8)
    }
    function _glCreateProgram() {
      var id = GL.getNewId(GL.programs, GL.programsFreeId, GL.programsCounter)
      var program = GLctx.createProgram()
      program.name = id
      program.maxUniformLength = program.maxAttributeLength = program.maxUniformBlockNameLength = 0
      program.uniformIdCounter = 1
      GL.programs[id] = program
      return id
    }
    function _glCreateShader(shaderType) {
      var id = GL.getNewId(GL.shaders, GL.shadersFreeId, GL.shadersCounter)
      GL.shaders[id] = GLctx.createShader(shaderType)
      return id
    }
    function _glCullFace(x0) {
      GLctx['cullFace'](x0)
    }
    function _glDeleteBuffers(n, buffers) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(buffers + i * 4) >> 2]
        var buffer = GL.buffers[id]
        if (!buffer) continue
        GLctx.deleteBuffer(buffer)
        buffer.name = 0
        GL.buffers[id] = null
        GL.buffersFreeId.push(id)
        if (id == GLctx.currentPixelPackBufferBinding) GLctx.currentPixelPackBufferBinding = 0
        if (id == GLctx.currentPixelUnpackBufferBinding) GLctx.currentPixelUnpackBufferBinding = 0
      }
    }
    function _glDeleteFramebuffers(n, framebuffers) {
      for (var i = 0; i < n; ++i) {
        var id = HEAP32[(framebuffers + i * 4) >> 2]
        var framebuffer = GL.framebuffers[id]
        if (!framebuffer) continue
        GLctx.deleteFramebuffer(framebuffer)
        framebuffer.name = 0
        GL.framebuffers[id] = null
        GL.framebuffersFreeId.push(id)
      }
    }
    function _glDeleteProgram(id) {
      if (!id) return
      var program = GL.programs[id]
      if (!program) {
        GL.recordError(1281)
        return
      }
      GLctx.deleteProgram(program)
      program.name = 0
      GL.programs[id] = null
      GL.programsFreeId.push(id)
    }
    function _glDeleteQueries(n, ids) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(ids + i * 4) >> 2]
        var query = GL.queries[id]
        if (!query) continue
        GLctx['deleteQuery'](query)
        GL.queries[id] = null
        GL.queriesFreeId.push(id)
      }
    }
    function _glDeleteRenderbuffers(n, renderbuffers) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(renderbuffers + i * 4) >> 2]
        var renderbuffer = GL.renderbuffers[id]
        if (!renderbuffer) continue
        GLctx.deleteRenderbuffer(renderbuffer)
        renderbuffer.name = 0
        GL.renderbuffers[id] = null
        GL.renderbuffersFreeId.push(id)
      }
    }
    function _glDeleteSamplers(n, samplers) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(samplers + i * 4) >> 2]
        var sampler = GL.samplers[id]
        if (!sampler) continue
        GLctx['deleteSampler'](sampler)
        sampler.name = 0
        GL.samplers[id] = null
        GL.samplersFreeId.push(id)
      }
    }
    function _glDeleteShader(id) {
      if (!id) return
      var shader = GL.shaders[id]
      if (!shader) {
        GL.recordError(1281)
        return
      }
      GLctx.deleteShader(shader)
      GL.shaders[id] = null
      GL.shadersFreeId.push(id)
    }
    function _glDeleteSync(id) {
      if (!id) return
      var sync = GL.syncs[id]
      if (!sync) {
        GL.recordError(1281)
        return
      }
      GLctx.deleteSync(sync)
      sync.name = 0
      GL.syncs[id] = null
      GL.syncsFreeId.push(id)
    }
    function _glDeleteTextures(n, textures) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(textures + i * 4) >> 2]
        var texture = GL.textures[id]
        if (!texture) continue
        GLctx.deleteTexture(texture)
        texture.name = 0
        GL.textures[id] = null
        GL.texturesFreeId.push(id)
      }
    }
    function _glDeleteVertexArrays(n, vaos) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(vaos + i * 4) >> 2]
        GLctx['deleteVertexArray'](GL.vaos[id])
        GL.vaos[id] = null
        GL.vaosFreeId.push(id)
      }
    }
    function _glDepthFunc(x0) {
      GLctx['depthFunc'](x0)
    }
    function _glDepthMask(flag) {
      GLctx.depthMask(!!flag)
    }
    function _glDepthRangef(x0, x1) {
      GLctx['depthRange'](x0, x1)
    }
    function _glDisable(x0) {
      GLctx['disable'](x0)
    }
    function _glDrawArrays(mode, first, count) {
      GLctx.drawArrays(mode, first, count)
    }
    function _glDrawArraysInstanced(mode, first, count, primcount) {
      GLctx['drawArraysInstanced'](mode, first, count, primcount)
    }
    function _glDrawBuffers(n, bufs) {
      var bufArray = tempFixedLengthArray[n]
      for (var i = 0; i < n; i++) {
        bufArray[i] = HEAP32[(bufs + i * 4) >> 2]
      }
      GLctx['drawBuffers'](bufArray)
    }
    function _glDrawElementsInstanced(mode, count, type, indices, primcount) {
      GLctx['drawElementsInstanced'](mode, count, type, indices, primcount)
    }
    function _glDrawRangeElements(mode, start, end, count, type, indices) {
      _glDrawElements(mode, count, type, indices)
    }
    function _glEnable(x0) {
      GLctx['enable'](x0)
    }
    function _glEnableVertexAttribArray(index) {
      GLctx.enableVertexAttribArray(index)
    }
    function _glEndQuery(x0) {
      GLctx['endQuery'](x0)
    }
    function _glEndTransformFeedback() {
      GLctx['endTransformFeedback']()
    }
    function _glFenceSync(condition, flags) {
      var sync = GLctx.fenceSync(condition, flags)
      if (sync) {
        var id = GL.getNewId(GL.syncs, GL.syncsFreeId, GL.syncsCounter)
        sync.name = id
        GL.syncs[id] = sync
        return id
      }
      return 0
    }
    function _glFramebufferRenderbuffer(target, attachment, renderbuffertarget, renderbuffer) {
      GLctx.framebufferRenderbuffer(target, attachment, renderbuffertarget, GL.renderbuffers[renderbuffer])
    }
    function _glFramebufferTexture2D(target, attachment, textarget, texture, level) {
      GLctx.framebufferTexture2D(target, attachment, textarget, GL.textures[texture], level)
    }
    function _glFramebufferTextureLayer(target, attachment, texture, level, layer) {
      GLctx.framebufferTextureLayer(target, attachment, GL.textures[texture], level, layer)
    }
    function _glFrontFace(x0) {
      GLctx['frontFace'](x0)
    }
    function _glGenBuffers(n, buffers) {
      __glGenObject(n, buffers, 'createBuffer', GL.buffers, GL.buffersFreeId, GL.buffersCounter)
    }
    function _glGenFramebuffers(n, ids) {
      __glGenObject(n, ids, 'createFramebuffer', GL.framebuffers, GL.framebuffersFreeId, GL.framebuffersCounter)
    }
    function _glGenQueries(n, ids) {
      __glGenObject(n, ids, 'createQuery', GL.queries, GL.queriesFreeId, GL.queriesCounter)
    }
    function _glGenRenderbuffers(n, renderbuffers) {
      __glGenObject(
        n,
        renderbuffers,
        'createRenderbuffer',
        GL.renderbuffers,
        GL.renderbuffersFreeId,
        GL.renderbuffersCounter
      )
    }
    function _glGenSamplers(n, samplers) {
      __glGenObject(n, samplers, 'createSampler', GL.samplers, GL.samplersFreeId, GL.samplersCounter)
    }
    function _glGenTextures(n, textures) {
      __glGenObject(n, textures, 'createTexture', GL.textures, GL.texturesFreeId, GL.texturesCounter)
    }
    function _glGenVertexArrays(n, arrays) {
      __glGenObject(n, arrays, 'createVertexArray', GL.vaos, GL.vaosFreeId, GL.vaosCounter)
    }
    function _glGenerateMipmap(x0) {
      GLctx['generateMipmap'](x0)
    }
    function _glGetActiveUniform(program, index, bufSize, length, size, type, name) {
      __glGetActiveAttribOrUniform('getActiveUniform', program, index, bufSize, length, size, type, name)
    }
    function _glGetActiveUniformBlockName(program, uniformBlockIndex, bufSize, length, uniformBlockName) {
      program = GL.programs[program]
      var result = GLctx['getActiveUniformBlockName'](program, uniformBlockIndex)
      if (!result) return
      if (uniformBlockName && bufSize > 0) {
        var numBytesWrittenExclNull = stringToUTF8(result, uniformBlockName, bufSize)
        if (length) HEAP32[length >> 2] = numBytesWrittenExclNull
      } else {
        if (length) HEAP32[length >> 2] = 0
      }
    }
    function _glGetActiveUniformsiv(program, uniformCount, uniformIndices, pname, params) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      if (uniformCount > 0 && uniformIndices == 0) {
        GL.recordError(1281)
        return
      }
      program = GL.programs[program]
      var ids = []
      for (var i = 0; i < uniformCount; i++) {
        ids.push(HEAP32[(uniformIndices + i * 4) >> 2])
      }
      var result = GLctx['getActiveUniforms'](program, ids, pname)
      if (!result) return
      var len = result.length
      for (var i = 0; i < len; i++) {
        HEAP32[(params + i * 4) >> 2] = result[i]
      }
    }
    function _glGetIntegerv(name_, p) {
      emscriptenWebGLGet(name_, p, 0)
    }
    function _glGetProgramInfoLog(program, maxLength, length, infoLog) {
      var log = GLctx.getProgramInfoLog(GL.programs[program])
      if (log === null) log = '(unknown error)'
      var numBytesWrittenExclNull = maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0
      if (length) HEAP32[length >> 2] = numBytesWrittenExclNull
    }
    function _glGetProgramiv(program, pname, p) {
      if (!p) {
        GL.recordError(1281)
        return
      }
      if (program >= GL.programsCounter.x) {
        GL.recordError(1281)
        return
      }
      program = GL.programs[program]
      if (pname == 35716) {
        var log = GLctx.getProgramInfoLog(program)
        if (log === null) log = '(unknown error)'
        HEAP32[p >> 2] = log.length + 1
      } else if (pname == 35719) {
        if (!program.maxUniformLength) {
          for (var i = 0; i < GLctx.getProgramParameter(program, 35718); ++i) {
            program.maxUniformLength = Math.max(
              program.maxUniformLength,
              GLctx.getActiveUniform(program, i).name.length + 1
            )
          }
        }
        HEAP32[p >> 2] = program.maxUniformLength
      } else if (pname == 35722) {
        if (!program.maxAttributeLength) {
          for (var i = 0; i < GLctx.getProgramParameter(program, 35721); ++i) {
            program.maxAttributeLength = Math.max(
              program.maxAttributeLength,
              GLctx.getActiveAttrib(program, i).name.length + 1
            )
          }
        }
        HEAP32[p >> 2] = program.maxAttributeLength
      } else if (pname == 35381) {
        if (!program.maxUniformBlockNameLength) {
          for (var i = 0; i < GLctx.getProgramParameter(program, 35382); ++i) {
            program.maxUniformBlockNameLength = Math.max(
              program.maxUniformBlockNameLength,
              GLctx.getActiveUniformBlockName(program, i).length + 1
            )
          }
        }
        HEAP32[p >> 2] = program.maxUniformBlockNameLength
      } else {
        HEAP32[p >> 2] = GLctx.getProgramParameter(program, pname)
      }
    }
    function _glGetQueryObjectuiv(id, pname, params) {
      if (!params) {
        GL.recordError(1281)
        return
      }
      var query = GL.queries[id]
      var param = GLctx['getQueryParameter'](query, pname)
      var ret
      if (typeof param == 'boolean') {
        ret = param ? 1 : 0
      } else {
        ret = param
      }
      HEAP32[params >> 2] = ret
    }
    function _glGetStringi(name, index) {
      if (GL.currentContext.version < 2) {
        GL.recordError(1282)
        return 0
      }
      var stringiCache = GL.stringiCache[name]
      if (stringiCache) {
        if (index < 0 || index >= stringiCache.length) {
          GL.recordError(1281)
          return 0
        }
        return stringiCache[index]
      }
      switch (name) {
        case 7939:
          var exts = GLctx.getSupportedExtensions() || []
          exts = exts.concat(
            exts.map(function (e) {
              return 'GL_' + e
            })
          )
          exts = exts.map(function (e) {
            return stringToNewUTF8(e)
          })
          stringiCache = GL.stringiCache[name] = exts
          if (index < 0 || index >= stringiCache.length) {
            GL.recordError(1281)
            return 0
          }
          return stringiCache[index]
        default:
          GL.recordError(1280)
          return 0
      }
    }
    function _glGetUniformLocation(program, name) {
      name = UTF8ToString(name)
      if ((program = GL.programs[program])) {
        webglPrepareUniformLocationsBeforeFirstUse(program)
        var uniformLocsById = program.uniformLocsById
        var arrayIndex = 0
        var uniformBaseName = name
        var leftBrace = webglGetLeftBracePos(name)
        if (leftBrace > 0) {
          arrayIndex = jstoi_q(name.slice(leftBrace + 1)) >>> 0
          uniformBaseName = name.slice(0, leftBrace)
        }
        var sizeAndId = program.uniformSizeAndIdsByName[uniformBaseName]
        if (sizeAndId && arrayIndex < sizeAndId[0]) {
          arrayIndex += sizeAndId[1]
          if ((uniformLocsById[arrayIndex] = uniformLocsById[arrayIndex] || GLctx.getUniformLocation(program, name))) {
            return arrayIndex
          }
        }
      } else {
        GL.recordError(1281)
      }
      return -1
    }
    function _glLinkProgram(program) {
      program = GL.programs[program]
      GLctx.linkProgram(program)
      program.uniformLocsById = 0
      program.uniformSizeAndIdsByName = {}
    }
    function _glPauseTransformFeedback() {
      GLctx['pauseTransformFeedback']()
    }
    function _glReadBuffer(x0) {
      GLctx['readBuffer'](x0)
    }
    function _glReadPixels(x, y, width, height, format, type, pixels) {
      if (true) {
        if (GLctx.currentPixelPackBufferBinding) {
          GLctx.readPixels(x, y, width, height, format, type, pixels)
        } else {
          var heap = heapObjectForWebGLType(type)
          GLctx.readPixels(x, y, width, height, format, type, heap, pixels >> heapAccessShiftForWebGLHeap(heap))
        }
        return
      }
      var pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, format)
      if (!pixelData) {
        GL.recordError(1280)
        return
      }
      GLctx.readPixels(x, y, width, height, format, type, pixelData)
    }
    function _glRenderbufferStorageMultisample(x0, x1, x2, x3, x4) {
      GLctx['renderbufferStorageMultisample'](x0, x1, x2, x3, x4)
    }
    function _glResumeTransformFeedback() {
      GLctx['resumeTransformFeedback']()
    }
    function _glSamplerParameterf(sampler, pname, param) {
      GLctx['samplerParameterf'](GL.samplers[sampler], pname, param)
    }
    function _glSamplerParameteri(sampler, pname, param) {
      GLctx['samplerParameteri'](GL.samplers[sampler], pname, param)
    }
    function _glScissor(x0, x1, x2, x3) {
      GLctx['scissor'](x0, x1, x2, x3)
    }
    function _glShaderSource(shader, count, string, length) {
      var source = GL.getSource(shader, count, string, length)
      GLctx.shaderSource(GL.shaders[shader], source)
    }
    function _glStencilFunc(x0, x1, x2) {
      GLctx['stencilFunc'](x0, x1, x2)
    }
    function _glStencilFuncSeparate(x0, x1, x2, x3) {
      GLctx['stencilFuncSeparate'](x0, x1, x2, x3)
    }
    function _glStencilMask(x0) {
      GLctx['stencilMask'](x0)
    }
    function _glStencilMaskSeparate(x0, x1) {
      GLctx['stencilMaskSeparate'](x0, x1)
    }
    function _glStencilOp(x0, x1, x2) {
      GLctx['stencilOp'](x0, x1, x2)
    }
    function _glStencilOpSeparate(x0, x1, x2, x3) {
      GLctx['stencilOpSeparate'](x0, x1, x2, x3)
    }
    function _glTexParameterf(x0, x1, x2) {
      GLctx['texParameterf'](x0, x1, x2)
    }
    function _glTexParameteri(x0, x1, x2) {
      GLctx['texParameteri'](x0, x1, x2)
    }
    function _glTexSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels) {
      if (true) {
        if (GLctx.currentPixelUnpackBufferBinding) {
          GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels)
        } else if (pixels) {
          var heap = heapObjectForWebGLType(type)
          GLctx.texSubImage2D(
            target,
            level,
            xoffset,
            yoffset,
            width,
            height,
            format,
            type,
            heap,
            pixels >> heapAccessShiftForWebGLHeap(heap)
          )
        } else {
          GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, null)
        }
        return
      }
      var pixelData = null
      if (pixels) pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, 0)
      GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixelData)
    }
    function _glTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, pixels) {
      if (GLctx.currentPixelUnpackBufferBinding) {
        GLctx['texSubImage3D'](target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, pixels)
      } else if (pixels) {
        var heap = heapObjectForWebGLType(type)
        GLctx['texSubImage3D'](
          target,
          level,
          xoffset,
          yoffset,
          zoffset,
          width,
          height,
          depth,
          format,
          type,
          heap,
          pixels >> heapAccessShiftForWebGLHeap(heap)
        )
      } else {
        GLctx['texSubImage3D'](target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, null)
      }
    }
    function _glTransformFeedbackVaryings(program, count, varyings, bufferMode) {
      program = GL.programs[program]
      var vars = []
      for (var i = 0; i < count; i++) vars.push(UTF8ToString(HEAP32[(varyings + i * 4) >> 2]))
      GLctx['transformFeedbackVaryings'](program, vars, bufferMode)
    }
    function _glUniform1i(location, v0) {
      GLctx.uniform1i(webglGetUniformLocation(location), v0)
    }
    function _glUniformBlockBinding(program, uniformBlockIndex, uniformBlockBinding) {
      program = GL.programs[program]
      GLctx['uniformBlockBinding'](program, uniformBlockIndex, uniformBlockBinding)
    }
    function _glUseProgram(program) {
      program = GL.programs[program]
      GLctx.useProgram(program)
      GLctx.currentProgram = program
    }
    function _glVertexAttrib4f(x0, x1, x2, x3, x4) {
      GLctx['vertexAttrib4f'](x0, x1, x2, x3, x4)
    }
    function _glVertexAttribDivisor(index, divisor) {
      GLctx['vertexAttribDivisor'](index, divisor)
    }
    function _glVertexAttribIPointer(index, size, type, stride, ptr) {
      GLctx['vertexAttribIPointer'](index, size, type, stride, ptr)
    }
    function _glVertexAttribPointer(index, size, type, normalized, stride, ptr) {
      GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr)
    }
    function _glViewport(x0, x1, x2, x3) {
      GLctx['viewport'](x0, x1, x2, x3)
    }
    function _glGetString(name_) {
      var ret = GL.stringCache[name_]
      if (!ret) {
        switch (name_) {
          case 7939:
            var exts = GLctx.getSupportedExtensions() || []
            exts = exts.concat(
              exts.map(function (e) {
                return 'GL_' + e
              })
            )
            ret = stringToNewUTF8(exts.join(' '))
            break
          case 7936:
          case 7937:
          case 37445:
          case 37446:
            var s = GLctx.getParameter(name_)
            if (!s) {
              GL.recordError(1280)
            }
            ret = s && stringToNewUTF8(s)
            break
          case 7938:
            var glVersion = GLctx.getParameter(7938)
            if (true) glVersion = 'OpenGL ES 3.0 (' + glVersion + ')'
            else {
              glVersion = 'OpenGL ES 2.0 (' + glVersion + ')'
            }
            ret = stringToNewUTF8(glVersion)
            break
          case 35724:
            var glslVersion = GLctx.getParameter(35724)
            var ver_re = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/
            var ver_num = glslVersion.match(ver_re)
            if (ver_num !== null) {
              if (ver_num[1].length == 3) ver_num[1] = ver_num[1] + '0'
              glslVersion = 'OpenGL ES GLSL ES ' + ver_num[1] + ' (' + glslVersion + ')'
            }
            ret = stringToNewUTF8(glslVersion)
            break
          default:
            GL.recordError(1280)
        }
        GL.stringCache[name_] = ret
      }
      return ret
    }
    var GLEW = {
      isLinaroFork: 1,
      extensions: null,
      error: { 0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null },
      version: { 1: null, 2: null, 3: null, 4: null },
      errorStringConstantFromCode: function (error) {
        if (GLEW.isLinaroFork) {
          switch (error) {
            case 4:
              return 'OpenGL ES lib expected, found OpenGL lib'
            case 5:
              return 'OpenGL lib expected, found OpenGL ES lib'
            case 6:
              return 'Missing EGL version'
            case 7:
              return 'EGL 1.1 and up are supported'
            default:
              break
          }
        }
        switch (error) {
          case 0:
            return 'No error'
          case 1:
            return 'Missing GL version'
          case 2:
            return 'GL 1.1 and up are supported'
          case 3:
            return 'GLX 1.2 and up are supported'
          default:
            return null
        }
      },
      errorString: function (error) {
        if (!GLEW.error[error]) {
          var string = GLEW.errorStringConstantFromCode(error)
          if (!string) {
            string = 'Unknown error'
            error = 8
          }
          GLEW.error[error] = allocateUTF8(string)
        }
        return GLEW.error[error]
      },
      versionStringConstantFromCode: function (name) {
        switch (name) {
          case 1:
            return '1.10.0'
          case 2:
            return '1'
          case 3:
            return '10'
          case 4:
            return '0'
          default:
            return null
        }
      },
      versionString: function (name) {
        if (!GLEW.version[name]) {
          var string = GLEW.versionStringConstantFromCode(name)
          if (!string) return 0
          GLEW.version[name] = allocateUTF8(string)
        }
        return GLEW.version[name]
      },
      extensionIsSupported: function (name) {
        if (!GLEW.extensions) {
          GLEW.extensions = UTF8ToString(_glGetString(7939)).split(' ')
        }
        if (GLEW.extensions.includes(name)) return 1
        return GLEW.extensions.includes('GL_' + name)
      }
    }
    function _glewInit() {
      return 0
    }
    function _llvm_eh_typeid_for(type) {
      return type
    }
    function _re_emscripten_async_wget2_data(
      handle,
      url,
      request,
      param,
      header,
      arg,
      free,
      async,
      onload,
      onerror,
      onprogress
    ) {
      var _url = UTF8ToString(url)
      var _request = UTF8ToString(request)
      var _param = UTF8ToString(param)
      var _header = UTF8ToString(header)
      var http
      if (handle >= 0) {
        http = Module['m_re_em_wget2_wgetRequests'][handle]
      } else {
        http = new XMLHttpRequest()
        handle = Module['m_re_em_wget2_nextWgetRequestHandle']
        Module['m_re_em_wget2_nextWgetRequestHandle']++
      }
      http.open(_request, _url, async)
      http.responseType = 'arraybuffer'
      function onerrorjs() {
        if (onerror) {
          var statusText = 0
          if (http.statusText) {
            var len = lengthBytesUTF8(http.statusText) + 1
            statusText = stackAlloc(len)
            stringToUTF8(http.statusText, statusText, len)
          }
          getWasmTableEntry(onerror)(handle, arg, http.status, statusText)
        }
      }
      http.onload = function http_onload(e) {
        if (
          (http.status >= 200 && http.status < 300) ||
          (http.status === 0 && _url.substr(0, 4).toLowerCase() != 'http')
        ) {
          if (free > -500) {
            var byteArray = new Uint8Array(http.response)
            var buffer = _malloc(byteArray.length)
            HEAPU8.set(byteArray, buffer)
            if (onload) getWasmTableEntry(onload)(handle, arg, buffer, byteArray.length)
            if (free) _free(buffer)
          } else {
            if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
              Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf_freeids'].pop()
            } else {
              Module['m_re_em_golarraybuf_temp_id0'] = Module['m_re_em_golarraybuf'].length
            }
            Module['m_re_em_golarraybuf'][Module['m_re_em_golarraybuf_temp_id0']] = new Uint8Array(
              new Uint8Array(http.response)
            )
            if (onload) getWasmTableEntry(onload)(handle, arg, Module['m_re_em_golarraybuf_temp_id0'], 0)
          }
        } else {
          onerrorjs()
        }
      }
      http.onerror = function http_onerror(e) {
        onerrorjs()
      }
      http.onprogress = function http_onprogress(e) {
        if (onprogress)
          getWasmTableEntry(onprogress)(
            handle,
            arg,
            e.loaded,
            e.lengthComputable || e.lengthComputable === undefined ? e.total : 0
          )
      }
      http.onabort = function http_onabort(e) {
        delete Module['m_re_em_wget2_wgetRequests'][handle]
      }
      try {
        if (http.channel instanceof Ci.nsIHttpChannel) http.channel.redirectionLimit = 0
      } catch (ex) {}
      var segs = _header.split('|')
      for (var i = 0; i < segs.length; ++i) {
        var seg = segs[i].split(':')
        if (seg.length >= 2) {
          http.setRequestHeader(seg[0], seg[1])
        }
      }
      if (_request == 'POST') {
        http.send(_param)
      } else {
        http.send(null)
      }
      Module['m_re_em_wget2_wgetRequests'][handle] = http
      return handle
    }
    function _re_emscripten_call_worker(
      id,
      immediate,
      callid,
      funcName,
      data,
      size,
      extbufids,
      extbufnum,
      callback,
      arg
    ) {
      funcName = UTF8ToString(funcName)
      var info = Browser.workers[id]
      var callbackId = -1
      if (callback) {
        callbackId = info.callbacks.length
        info.callbacks.push({ func: getWasmTableEntry(callback), arg: arg })
        info.awaited++
      }
      var extbufs = []
      var transferobjs = []
      if (extbufnum > 0) {
        var extbufids_js = new Int32Array(HEAPU8.buffer, extbufids, extbufnum)
        for (var i = 0; i < extbufnum; ++i) {
          extbufs[i] = Module['m_re_em_golarraybuf'][extbufids_js[i]]
          transferobjs[i] = extbufs[i].buffer
        }
      }
      var transferObject = {
        type: immediate > 0 ? 1 : 0,
        callid: callid,
        funcName: funcName,
        callbackId: callbackId,
        data: size ? new Uint8Array(HEAPU8.subarray(data, data + size)) : 0,
        extbufs: extbufs
      }
      if (size) {
        transferobjs.push(transferObject.data.buffer)
        info.worker.postMessage(transferObject, transferobjs)
      } else {
        info.worker.postMessage(transferObject)
      }
    }
    function _re_emscripten_create_worker(url) {
      url = UTF8ToString(url)
      var id = Browser.workers.length
      var temp_content = `g_re_em_force_engine_dir ="${url}"; importScripts("${url}");`
      var temp_blob = URL.createObjectURL(new Blob([temp_content], { type: 'text/javascript' }))
      var info = { worker: new Worker(temp_blob), callbacks: [], awaited: 0, buffer: 0, bufferSize: 0 }
      URL.revokeObjectURL(temp_blob)
      info.worker.onmessage = function info_worker_onmessage(msg) {
        if (ABORT) return
        var info = Browser.workers[id]
        if (!info) return
        var callbackId = msg.data['callbackId']
        var callbackInfo = info.callbacks[callbackId]
        if (!callbackInfo) return
        if (msg.data['finalResponse']) {
          info.awaited--
          info.callbacks[callbackId] = null
        }
        var data = msg.data['data']
        if (data) {
          if (!data.byteLength) data = new Uint8Array(data)
          var extbufs = msg.data['extbufs']
          if (!info.buffer || info.bufferSize < 4 * extbufs.length + data.length) {
            if (info.buffer) _free(info.buffer)
            info.bufferSize = 4 * extbufs.length + data.length
            info.buffer = _malloc(info.bufferSize)
          }
          HEAPU8.set(data, info.buffer + 4 * extbufs.length)
          if (extbufs.length > 0) {
            var extbufids = new Int32Array(HEAPU8.buffer, info.buffer, extbufs.length)
            for (var i = 0; i < extbufs.length; ++i) {
              if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
                extbufids[i] = Module['m_re_em_golarraybuf_freeids'].pop()
              } else {
                extbufids[i] = Module['m_re_em_golarraybuf'].length
              }
              Module['m_re_em_golarraybuf'][extbufids[i]] = extbufs[i]
            }
          }
          callbackInfo.func(
            info.buffer + 4 * extbufs.length,
            data.length,
            info.buffer,
            extbufs.length,
            callbackInfo.arg
          )
        } else {
          callbackInfo.func(0, 0, 0, 0, callbackInfo.arg)
        }
      }
      Browser.workers.push(info)
      return id
    }
    function _re_emscripten_destroy_worker(id) {
      var info = Browser.workers[id]
      info.worker.terminate()
      if (info.buffer) _free(info.buffer)
      Browser.workers[id] = null
    }
    function _re_emscripten_egl_set_golmultisample_enable(enable) {
      EGL.g_bGolMultiSampleEnable = enable > 0 ? true : false
    }
    function _re_emscripten_enable_worker(id, enable) {
      noExitRuntime = true
      var info = Browser.workers[id]
      if (enable < 0) {
        info.callbacks = []
        info.awaited = 0
      }
      var transferObject = { type: 2, enable: enable }
      info.worker.postMessage(transferObject)
    }
    function _re_emscripten_env_init(mainthread) {
      Module['m_re_em_mainloop_delaytime'] = 16
      Module['m_re_em_mainloop_valid'] = 0
      Module['m_re_em_golarraybuf'] = []
      Module['m_re_em_golarraybuf_freeids'] = []
      if (typeof Module.m_re_em_get_gpu_temp_buf == 'undefined') {
        Module.m_re_em_get_gpu_temp_buf = new ArrayBuffer(128)
      }
      if (typeof Module['m_re_em_window_width'] == 'undefined') {
        Module['m_re_em_window_width'] = 1
      }
      if (typeof Module['m_re_em_window_height'] == 'undefined') {
        Module['m_re_em_window_height'] = 1
      }
      Module['m_re_em_wget2_wgetRequests'] = {}
      Module['m_re_em_wget2_nextWgetRequestHandle'] = 0
    }
    function _re_emscripten_get_worker_queue_size(id) {
      var info = Browser.workers[id]
      if (!info) return -1
      return info.awaited
    }
    var IDBStore = {
      indexedDB: function () {
        if (typeof indexedDB != 'undefined') return indexedDB
        var ret = null
        if (typeof window == 'object')
          ret = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
        assert(ret, 'IDBStore used, but indexedDB not supported')
        return ret
      },
      DB_VERSION: 22,
      DB_STORE_NAME: 'FILE_DATA',
      dbs: {},
      blobs: [0],
      getDB: function (name, callback) {
        var db = IDBStore.dbs[name]
        if (db) {
          return callback(null, db)
        }
        var req
        try {
          req = IDBStore.indexedDB().open(name, IDBStore.DB_VERSION)
        } catch (e) {
          return callback(e)
        }
        req.onupgradeneeded = function (e) {
          var db = e.target.result
          var transaction = e.target.transaction
          var fileStore
          if (db.objectStoreNames.contains(IDBStore.DB_STORE_NAME)) {
            fileStore = transaction.objectStore(IDBStore.DB_STORE_NAME)
          } else {
            fileStore = db.createObjectStore(IDBStore.DB_STORE_NAME)
          }
        }
        req.onsuccess = function () {
          db = req.result
          IDBStore.dbs[name] = db
          callback(null, db)
        }
        req.onerror = function (e) {
          callback(this.error)
          e.preventDefault()
        }
      },
      getStore: function (dbName, type, callback) {
        IDBStore.getDB(dbName, function (error, db) {
          if (error) return callback(error)
          var transaction = db.transaction([IDBStore.DB_STORE_NAME], type)
          transaction.onerror = function (e) {
            callback(this.error || 'unknown error')
            e.preventDefault()
          }
          var store = transaction.objectStore(IDBStore.DB_STORE_NAME)
          callback(null, store)
        })
      },
      getFile: function (dbName, id, callback) {
        IDBStore.getStore(dbName, 'readonly', function (err, store) {
          if (err) return callback(err)
          var req = store.get(id)
          req.onsuccess = function (event) {
            var result = event.target.result
            if (!result) {
              return callback('file ' + id + ' not found')
            }
            return callback(null, result)
          }
          req.onerror = function (error) {
            callback(error)
          }
        })
      },
      setFile: function (dbName, id, data, callback) {
        IDBStore.getStore(dbName, 'readwrite', function (err, store) {
          if (err) return callback(err)
          var req = store.put(data, id)
          req.onsuccess = function (event) {
            callback()
          }
          req.onerror = function (error) {
            callback(error)
          }
        })
      },
      deleteFile: function (dbName, id, callback) {
        IDBStore.getStore(dbName, 'readwrite', function (err, store) {
          if (err) return callback(err)
          var req = store.delete(id)
          req.onsuccess = function (event) {
            callback()
          }
          req.onerror = function (error) {
            callback(error)
          }
        })
      },
      existsFile: function (dbName, id, callback) {
        IDBStore.getStore(dbName, 'readonly', function (err, store) {
          if (err) return callback(err)
          var req = store.count(id)
          req.onsuccess = function (event) {
            callback(null, event.target.result > 0)
          }
          req.onerror = function (error) {
            callback(error)
          }
        })
      },
      getTotalSize: function (dbName, callback) {
        IDBStore.getStore(dbName, 'readonly', function (err, store) {
          if (err) return callback(err)
          re_em_global_temp_val = 0
          var req = store.openCursor()
          req.onsuccess = function (event) {
            var cursor = event.target.result
            if (cursor) {
              re_em_global_temp_val += cursor.value.byteLength
              cursor.continue()
            } else {
              callback(null, re_em_global_temp_val)
            }
          }
          req.onerror = function (error) {
            callback(error)
          }
        })
      },
      clearStorage: function (dbName, callback) {
        IDBStore.getStore(dbName, 'readwrite', function (err, store) {
          if (err) return callback(err)
          var req = store.clear()
          req.onsuccess = function (event) {
            callback(null)
          }
          req.onerror = function (error) {
            callback(error)
          }
        })
      }
    }
    function _re_emscripten_idb_async_load(db, id, arg, free, onfinal) {
      IDBStore.getFile(UTF8ToString(db), UTF8ToString(id), function (error, byteArray) {
        setTimeout(function () {
          if (error) {
            getWasmTableEntry(onfinal)(arg, 0, 0, 0)
          } else {
            var buffer = _malloc(byteArray.length)
            HEAPU8.set(byteArray, buffer)
            getWasmTableEntry(onfinal)(arg, 1, buffer, byteArray.length)
            if (free) _free(buffer)
          }
        }, 1)
      })
    }
    function _re_emscripten_idb_async_store(db, id, data, datasize, arg, onfinal) {
      IDBStore.setFile(
        UTF8ToString(db),
        UTF8ToString(id),
        new Uint8Array(HEAPU8.subarray(data, data + datasize)),
        function (error) {
          setTimeout(function () {
            if (error) {
              if (onfinal) getWasmTableEntry(onfinal)(arg, 0)
            } else {
              if (onfinal) getWasmTableEntry(onfinal)(arg, 1)
            }
          }, 1)
        }
      )
    }
    function _re_emscripten_worker_respond(data, size, extbufids, extbufnum) {
      if (workerenable < 0) {
        return
      }
      if (workerimmeproc > 0) {
        var extbufs = []
        var transferobjs = []
        if (extbufnum > 0) {
          var extbufids_js = new Int32Array(HEAPU8.buffer, extbufids, extbufnum)
          for (var i = 0; i < extbufnum; ++i) {
            extbufs[i] = Module['m_re_em_golarraybuf'][extbufids_js[i]]
            transferobjs[i] = extbufs[i].buffer
          }
        }
        var transferObject = {
          callbackId: workerCallbackId_imme,
          finalResponse: true,
          data: size ? new Uint8Array(HEAPU8.subarray(data, data + size)) : 0,
          extbufs: extbufs
        }
        if (size) {
          transferobjs.push(transferObject.data.buffer)
          postMessage(transferObject, transferobjs)
        } else {
          postMessage(transferObject)
        }
      } else {
        if (workerResponded) throw 'already responded with final response!'
        workerResponded = true
        var extbufs = []
        var transferobjs = []
        if (extbufnum > 0) {
          var extbufids_js = new Int32Array(HEAPU8.buffer, extbufids, extbufnum)
          for (var i = 0; i < extbufnum; ++i) {
            extbufs[i] = Module['m_re_em_golarraybuf'][extbufids_js[i]]
            transferobjs[i] = extbufs[i].buffer
          }
        }
        var transferObject = {
          callbackId: workerCallbackId,
          finalResponse: true,
          data: size ? new Uint8Array(HEAPU8.subarray(data, data + size)) : 0,
          extbufs: extbufs
        }
        if (size) {
          transferobjs.push(transferObject.data.buffer)
          postMessage(transferObject, transferobjs)
        } else {
          postMessage(transferObject)
        }
        if (workertaskbuffer.length > 0) {
          setTimeout(procworkertaskbuffer, 1)
        }
      }
    }
    function _re_emscripten_worker_respond_provisionally(data, size, extbufids, extbufnum) {
      if (workerenable < 0) {
        return
      }
      if (workerimmeproc > 0) {
        var extbufs = []
        var transferobjs = []
        if (extbufnum > 0) {
          var extbufids_js = new Int32Array(HEAPU8.buffer, extbufids, extbufnum)
          for (var i = 0; i < extbufnum; ++i) {
            extbufs[i] = Module['m_re_em_golarraybuf'][extbufids_js[i]]
            transferobjs[i] = extbufs[i].buffer
          }
        }
        var transferObject = {
          callbackId: workerCallbackId_imme,
          finalResponse: false,
          data: size ? new Uint8Array(HEAPU8.subarray(data, data + size)) : 0,
          extbufs: extbufs
        }
        if (size) {
          transferobjs.push(transferObject.data.buffer)
          postMessage(transferObject, transferobjs)
        } else {
          postMessage(transferObject)
        }
      } else {
        if (workerResponded) throw 'already responded with final response!'
        var extbufs = []
        var transferobjs = []
        if (extbufnum > 0) {
          var extbufids_js = new Int32Array(HEAPU8.buffer, extbufids, extbufnum)
          for (var i = 0; i < extbufnum; ++i) {
            extbufs[i] = Module['m_re_em_golarraybuf'][extbufids_js[i]]
            transferobjs[i] = extbufs[i].buffer
          }
        }
        var transferObject = {
          callbackId: workerCallbackId,
          finalResponse: false,
          data: size ? new Uint8Array(HEAPU8.subarray(data, data + size)) : 0,
          extbufs: extbufs
        }
        if (size) {
          transferobjs.push(transferObject.data.buffer)
          postMessage(transferObject, transferobjs)
        } else {
          postMessage(transferObject)
        }
      }
    }
    function __arraySum(array, index) {
      var sum = 0
      for (var i = 0; i <= index; sum += array[i++]) {}
      return sum
    }
    var __MONTH_DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    var __MONTH_DAYS_REGULAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    function __addDays(date, days) {
      var newDate = new Date(date.getTime())
      while (days > 0) {
        var leap = __isLeapYear(newDate.getFullYear())
        var currentMonth = newDate.getMonth()
        var daysInCurrentMonth = (leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[currentMonth]
        if (days > daysInCurrentMonth - newDate.getDate()) {
          days -= daysInCurrentMonth - newDate.getDate() + 1
          newDate.setDate(1)
          if (currentMonth < 11) {
            newDate.setMonth(currentMonth + 1)
          } else {
            newDate.setMonth(0)
            newDate.setFullYear(newDate.getFullYear() + 1)
          }
        } else {
          newDate.setDate(newDate.getDate() + days)
          return newDate
        }
      }
      return newDate
    }
    function writeArrayToMemory(array, buffer) {
      HEAP8.set(array, buffer)
    }
    function _strftime(s, maxsize, format, tm) {
      var tm_zone = HEAP32[(tm + 40) >> 2]
      var date = {
        tm_sec: HEAP32[tm >> 2],
        tm_min: HEAP32[(tm + 4) >> 2],
        tm_hour: HEAP32[(tm + 8) >> 2],
        tm_mday: HEAP32[(tm + 12) >> 2],
        tm_mon: HEAP32[(tm + 16) >> 2],
        tm_year: HEAP32[(tm + 20) >> 2],
        tm_wday: HEAP32[(tm + 24) >> 2],
        tm_yday: HEAP32[(tm + 28) >> 2],
        tm_isdst: HEAP32[(tm + 32) >> 2],
        tm_gmtoff: HEAP32[(tm + 36) >> 2],
        tm_zone: tm_zone ? UTF8ToString(tm_zone) : ''
      }
      var pattern = UTF8ToString(format)
      var EXPANSION_RULES_1 = {
        '%c': '%a %b %d %H:%M:%S %Y',
        '%D': '%m/%d/%y',
        '%F': '%Y-%m-%d',
        '%h': '%b',
        '%r': '%I:%M:%S %p',
        '%R': '%H:%M',
        '%T': '%H:%M:%S',
        '%x': '%m/%d/%y',
        '%X': '%H:%M:%S',
        '%Ec': '%c',
        '%EC': '%C',
        '%Ex': '%m/%d/%y',
        '%EX': '%H:%M:%S',
        '%Ey': '%y',
        '%EY': '%Y',
        '%Od': '%d',
        '%Oe': '%e',
        '%OH': '%H',
        '%OI': '%I',
        '%Om': '%m',
        '%OM': '%M',
        '%OS': '%S',
        '%Ou': '%u',
        '%OU': '%U',
        '%OV': '%V',
        '%Ow': '%w',
        '%OW': '%W',
        '%Oy': '%y'
      }
      for (var rule in EXPANSION_RULES_1) {
        pattern = pattern.replace(new RegExp(rule, 'g'), EXPANSION_RULES_1[rule])
      }
      var WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      var MONTHS = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
      function leadingSomething(value, digits, character) {
        var str = typeof value == 'number' ? value.toString() : value || ''
        while (str.length < digits) {
          str = character[0] + str
        }
        return str
      }
      function leadingNulls(value, digits) {
        return leadingSomething(value, digits, '0')
      }
      function compareByDay(date1, date2) {
        function sgn(value) {
          return value < 0 ? -1 : value > 0 ? 1 : 0
        }
        var compare
        if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
          if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
            compare = sgn(date1.getDate() - date2.getDate())
          }
        }
        return compare
      }
      function getFirstWeekStartDate(janFourth) {
        switch (janFourth.getDay()) {
          case 0:
            return new Date(janFourth.getFullYear() - 1, 11, 29)
          case 1:
            return janFourth
          case 2:
            return new Date(janFourth.getFullYear(), 0, 3)
          case 3:
            return new Date(janFourth.getFullYear(), 0, 2)
          case 4:
            return new Date(janFourth.getFullYear(), 0, 1)
          case 5:
            return new Date(janFourth.getFullYear() - 1, 11, 31)
          case 6:
            return new Date(janFourth.getFullYear() - 1, 11, 30)
        }
      }
      function getWeekBasedYear(date) {
        var thisDate = __addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday)
        var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4)
        var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4)
        var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear)
        var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear)
        if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
          if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
            return thisDate.getFullYear() + 1
          }
          return thisDate.getFullYear()
        }
        return thisDate.getFullYear() - 1
      }
      var EXPANSION_RULES_2 = {
        '%a': function (date) {
          return WEEKDAYS[date.tm_wday].substring(0, 3)
        },
        '%A': function (date) {
          return WEEKDAYS[date.tm_wday]
        },
        '%b': function (date) {
          return MONTHS[date.tm_mon].substring(0, 3)
        },
        '%B': function (date) {
          return MONTHS[date.tm_mon]
        },
        '%C': function (date) {
          var year = date.tm_year + 1900
          return leadingNulls((year / 100) | 0, 2)
        },
        '%d': function (date) {
          return leadingNulls(date.tm_mday, 2)
        },
        '%e': function (date) {
          return leadingSomething(date.tm_mday, 2, ' ')
        },
        '%g': function (date) {
          return getWeekBasedYear(date).toString().substring(2)
        },
        '%G': function (date) {
          return getWeekBasedYear(date)
        },
        '%H': function (date) {
          return leadingNulls(date.tm_hour, 2)
        },
        '%I': function (date) {
          var twelveHour = date.tm_hour
          if (twelveHour == 0) twelveHour = 12
          else if (twelveHour > 12) twelveHour -= 12
          return leadingNulls(twelveHour, 2)
        },
        '%j': function (date) {
          return leadingNulls(
            date.tm_mday +
              __arraySum(__isLeapYear(date.tm_year + 1900) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, date.tm_mon - 1),
            3
          )
        },
        '%m': function (date) {
          return leadingNulls(date.tm_mon + 1, 2)
        },
        '%M': function (date) {
          return leadingNulls(date.tm_min, 2)
        },
        '%n': function () {
          return '\n'
        },
        '%p': function (date) {
          if (date.tm_hour >= 0 && date.tm_hour < 12) {
            return 'AM'
          }
          return 'PM'
        },
        '%S': function (date) {
          return leadingNulls(date.tm_sec, 2)
        },
        '%t': function () {
          return '\t'
        },
        '%u': function (date) {
          return date.tm_wday || 7
        },
        '%U': function (date) {
          var days = date.tm_yday + 7 - date.tm_wday
          return leadingNulls(Math.floor(days / 7), 2)
        },
        '%V': function (date) {
          var val = Math.floor((date.tm_yday + 7 - ((date.tm_wday + 6) % 7)) / 7)
          if ((date.tm_wday + 371 - date.tm_yday - 2) % 7 <= 2) {
            val++
          }
          if (!val) {
            val = 52
            var dec31 = (date.tm_wday + 7 - date.tm_yday - 1) % 7
            if (dec31 == 4 || (dec31 == 5 && __isLeapYear((date.tm_year % 400) - 1))) {
              val++
            }
          } else if (val == 53) {
            var jan1 = (date.tm_wday + 371 - date.tm_yday) % 7
            if (jan1 != 4 && (jan1 != 3 || !__isLeapYear(date.tm_year))) val = 1
          }
          return leadingNulls(val, 2)
        },
        '%w': function (date) {
          return date.tm_wday
        },
        '%W': function (date) {
          var days = date.tm_yday + 7 - ((date.tm_wday + 6) % 7)
          return leadingNulls(Math.floor(days / 7), 2)
        },
        '%y': function (date) {
          return (date.tm_year + 1900).toString().substring(2)
        },
        '%Y': function (date) {
          return date.tm_year + 1900
        },
        '%z': function (date) {
          var off = date.tm_gmtoff
          var ahead = off >= 0
          off = Math.abs(off) / 60
          off = (off / 60) * 100 + (off % 60)
          return (ahead ? '+' : '-') + String('0000' + off).slice(-4)
        },
        '%Z': function (date) {
          return date.tm_zone
        },
        '%%': function () {
          return '%'
        }
      }
      pattern = pattern.replace(/%%/g, '\0\0')
      for (var rule in EXPANSION_RULES_2) {
        if (pattern.includes(rule)) {
          pattern = pattern.replace(new RegExp(rule, 'g'), EXPANSION_RULES_2[rule](date))
        }
      }
      pattern = pattern.replace(/\0\0/g, '%')
      var bytes = intArrayFromString(pattern, false)
      if (bytes.length > maxsize) {
        return 0
      }
      writeArrayToMemory(bytes, s)
      return bytes.length - 1
    }
    function _strftime_l(s, maxsize, format, tm, loc) {
      return _strftime(s, maxsize, format, tm)
    }
    function allocateUTF8OnStack(str) {
      var size = lengthBytesUTF8(str) + 1
      var ret = stackAlloc(size)
      stringToUTF8Array(str, HEAP8, ret, size)
      return ret
    }
    var FSNode = function (parent, name, mode, rdev) {
      if (!parent) {
        parent = this
      }
      this.parent = parent
      this.mount = parent.mount
      this.mounted = null
      this.id = FS.nextInode++
      this.name = name
      this.mode = mode
      this.node_ops = {}
      this.stream_ops = {}
      this.rdev = rdev
    }
    var readMode = 292 | 73
    var writeMode = 146
    Object.defineProperties(FSNode.prototype, {
      read: {
        get: function () {
          return (this.mode & readMode) === readMode
        },
        set: function (val) {
          val ? (this.mode |= readMode) : (this.mode &= ~readMode)
        }
      },
      write: {
        get: function () {
          return (this.mode & writeMode) === writeMode
        },
        set: function (val) {
          val ? (this.mode |= writeMode) : (this.mode &= ~writeMode)
        }
      },
      isFolder: {
        get: function () {
          return FS.isDir(this.mode)
        }
      },
      isDevice: {
        get: function () {
          return FS.isChrdev(this.mode)
        }
      }
    })
    FS.FSNode = FSNode
    FS.staticInit()
    InternalError = Module['InternalError'] = extendError(Error, 'InternalError')
    embind_init_charCodes()
    BindingError = Module['BindingError'] = extendError(Error, 'BindingError')
    init_ClassHandle()
    init_embind()
    init_RegisteredPointer()
    UnboundTypeError = Module['UnboundTypeError'] = extendError(Error, 'UnboundTypeError')
    init_emval()
    Module['requestFullscreen'] = function Module_requestFullscreen(lockPointer, resizeCanvas) {
      Browser.requestFullscreen(lockPointer, resizeCanvas)
    }
    Module['requestAnimationFrame'] = function Module_requestAnimationFrame(func) {
      Browser.requestAnimationFrame(func)
    }
    Module['setCanvasSize'] = function Module_setCanvasSize(width, height, noUpdates) {
      Browser.setCanvasSize(width, height, noUpdates)
    }
    Module['pauseMainLoop'] = function Module_pauseMainLoop() {
      Browser.mainLoop.pause()
    }
    Module['resumeMainLoop'] = function Module_resumeMainLoop() {
      Browser.mainLoop.resume()
    }
    Module['getUserMedia'] = function Module_getUserMedia() {
      Browser.getUserMedia()
    }
    Module['createContext'] = function Module_createContext(canvas, useWebGL, setInModule, webGLContextAttributes) {
      return Browser.createContext(canvas, useWebGL, setInModule, webGLContextAttributes)
    }
    var preloadedImages = {}
    var preloadedAudios = {}
    var GLctx
    for (var i = 0; i < 32; ++i) tempFixedLengthArray.push(new Array(i))
    var wasmImports = {
      n: ___cxa_begin_catch,
      r: ___cxa_end_catch,
      a: ___cxa_find_matching_catch_2,
      k: ___cxa_find_matching_catch_3,
      D: ___cxa_find_matching_catch_4,
      l: ___cxa_find_matching_catch_5,
      Ad: ___cxa_rethrow,
      F: ___cxa_throw,
      fn: ___cxa_uncaught_exceptions,
      e: ___resumeException,
      en: ___syscall_chmod,
      dn: ___syscall_faccessat,
      cn: ___syscall_fchmod,
      bn: ___syscall_fchown32,
      Ca: ___syscall_fcntl64,
      an: ___syscall_fstat64,
      Qe: ___syscall_ftruncate64,
      $m: ___syscall_getcwd,
      _m: ___syscall_ioctl,
      Zm: ___syscall_lstat64,
      Ym: ___syscall_mkdirat,
      Xm: ___syscall_newfstatat,
      zd: ___syscall_openat,
      Wm: ___syscall_readlinkat,
      Vm: ___syscall_rmdir,
      Um: ___syscall_stat64,
      Tm: ___syscall_unlinkat,
      Sm: ___syscall_utimensat,
      Nm: __embind_finalize_value_array,
      Mm: __embind_finalize_value_object,
      Oe: __embind_register_bigint,
      Lm: __embind_register_bool,
      fa: __embind_register_class,
      s: __embind_register_class_class_function,
      ga: __embind_register_class_constructor,
      L: __embind_register_class_function,
      Q: __embind_register_constant,
      Km: __embind_register_emval,
      na: __embind_register_enum,
      G: __embind_register_enum_value,
      xd: __embind_register_float,
      Da: __embind_register_integer,
      pa: __embind_register_memory_view,
      wd: __embind_register_std_string,
      bc: __embind_register_std_wstring,
      ua: __embind_register_value_array,
      Jm: __embind_register_value_array_element,
      Y: __embind_register_value_object,
      Im: __embind_register_value_object_field,
      Hm: __embind_register_void,
      Gm: __emscripten_get_now_is_monotonic,
      Fm: __emscripten_throw_longjmp,
      Em: __emval_decref,
      Dm: __emval_incref,
      ea: __emval_take_value,
      Cm: __gmtime_js,
      Bm: __localtime_js,
      Am: __tzset_js,
      wb: _abort,
      zm: _eglBindAPI,
      ym: _eglChooseConfig,
      xm: _eglCreateContext,
      wm: _eglCreateWindowSurface,
      vm: _eglDestroyContext,
      um: _eglDestroySurface,
      tm: _eglGetConfigAttrib,
      sm: _eglGetDisplay,
      rm: _eglGetError,
      qm: _eglInitialize,
      pm: _eglMakeCurrent,
      om: _eglQueryString,
      nm: _eglSwapBuffers,
      mm: _eglSwapInterval,
      lm: _eglTerminate,
      km: _eglWaitGL,
      jm: _eglWaitNative,
      y: _emscripten_asm_const_int,
      im: _emscripten_cancel_main_loop,
      ac: _emscripten_date_now,
      hm: _emscripten_exit_fullscreen,
      gm: _emscripten_exit_pointerlock,
      vd: _emscripten_get_callstack,
      vb: _emscripten_get_device_pixel_ratio,
      Sa: _emscripten_get_element_css_size,
      ud: _emscripten_get_gamepad_status,
      fm: _emscripten_get_mouse_status,
      $b: _emscripten_get_now,
      em: _emscripten_get_num_gamepads,
      dm: _emscripten_glActiveTexture,
      cm: _emscripten_glAttachShader,
      bm: _emscripten_glBeginQuery,
      am: _emscripten_glBeginQueryEXT,
      $l: _emscripten_glBeginTransformFeedback,
      _l: _emscripten_glBindAttribLocation,
      Zl: _emscripten_glBindBuffer,
      Yl: _emscripten_glBindBufferBase,
      Xl: _emscripten_glBindBufferRange,
      Wl: _emscripten_glBindFramebuffer,
      Vl: _emscripten_glBindRenderbuffer,
      Ul: _emscripten_glBindSampler,
      Tl: _emscripten_glBindTexture,
      Sl: _emscripten_glBindTransformFeedback,
      Rl: _emscripten_glBindVertexArray,
      Ql: _emscripten_glBindVertexArrayOES,
      Pl: _emscripten_glBlendColor,
      Ol: _emscripten_glBlendEquation,
      Nl: _emscripten_glBlendEquationSeparate,
      Ml: _emscripten_glBlendFunc,
      Ll: _emscripten_glBlendFuncSeparate,
      Kl: _emscripten_glBlitFramebuffer,
      Jl: _emscripten_glBufferData,
      Il: _emscripten_glBufferSubData,
      Hl: _emscripten_glCheckFramebufferStatus,
      Gl: _emscripten_glClear,
      Fl: _emscripten_glClearBufferfi,
      El: _emscripten_glClearBufferfv,
      Dl: _emscripten_glClearBufferiv,
      Cl: _emscripten_glClearBufferuiv,
      Bl: _emscripten_glClearColor,
      Al: _emscripten_glClearDepthf,
      zl: _emscripten_glClearStencil,
      yl: _emscripten_glClientWaitSync,
      xl: _emscripten_glColorMask,
      wl: _emscripten_glCompileShader,
      vl: _emscripten_glCompressedTexImage2D,
      ul: _emscripten_glCompressedTexImage3D,
      tl: _emscripten_glCompressedTexSubImage2D,
      sl: _emscripten_glCompressedTexSubImage3D,
      rl: _emscripten_glCopyBufferSubData,
      ql: _emscripten_glCopyTexImage2D,
      pl: _emscripten_glCopyTexSubImage2D,
      ol: _emscripten_glCopyTexSubImage3D,
      nl: _emscripten_glCreateProgram,
      ml: _emscripten_glCreateShader,
      ll: _emscripten_glCullFace,
      kl: _emscripten_glDeleteBuffers,
      jl: _emscripten_glDeleteFramebuffers,
      il: _emscripten_glDeleteProgram,
      hl: _emscripten_glDeleteQueries,
      gl: _emscripten_glDeleteQueriesEXT,
      fl: _emscripten_glDeleteRenderbuffers,
      el: _emscripten_glDeleteSamplers,
      dl: _emscripten_glDeleteShader,
      cl: _emscripten_glDeleteSync,
      bl: _emscripten_glDeleteTextures,
      al: _emscripten_glDeleteTransformFeedbacks,
      $k: _emscripten_glDeleteVertexArrays,
      _k: _emscripten_glDeleteVertexArraysOES,
      Zk: _emscripten_glDepthFunc,
      Yk: _emscripten_glDepthMask,
      Xk: _emscripten_glDepthRangef,
      Wk: _emscripten_glDetachShader,
      Vk: _emscripten_glDisable,
      Uk: _emscripten_glDisableVertexAttribArray,
      Tk: _emscripten_glDrawArrays,
      Sk: _emscripten_glDrawArraysInstanced,
      Rk: _emscripten_glDrawArraysInstancedANGLE,
      Qk: _emscripten_glDrawArraysInstancedARB,
      Pk: _emscripten_glDrawArraysInstancedEXT,
      Ok: _emscripten_glDrawArraysInstancedNV,
      Nk: _emscripten_glDrawBuffers,
      Mk: _emscripten_glDrawBuffersEXT,
      Lk: _emscripten_glDrawBuffersWEBGL,
      Kk: _emscripten_glDrawElements,
      Jk: _emscripten_glDrawElementsInstanced,
      Ik: _emscripten_glDrawElementsInstancedANGLE,
      Hk: _emscripten_glDrawElementsInstancedARB,
      Gk: _emscripten_glDrawElementsInstancedEXT,
      Fk: _emscripten_glDrawElementsInstancedNV,
      Ek: _emscripten_glDrawRangeElements,
      Dk: _emscripten_glEnable,
      Ck: _emscripten_glEnableVertexAttribArray,
      Bk: _emscripten_glEndQuery,
      Ak: _emscripten_glEndQueryEXT,
      zk: _emscripten_glEndTransformFeedback,
      yk: _emscripten_glFenceSync,
      xk: _emscripten_glFinish,
      wk: _emscripten_glFlush,
      vk: _emscripten_glFramebufferRenderbuffer,
      uk: _emscripten_glFramebufferTexture2D,
      tk: _emscripten_glFramebufferTextureLayer,
      sk: _emscripten_glFrontFace,
      rk: _emscripten_glGenBuffers,
      qk: _emscripten_glGenFramebuffers,
      pk: _emscripten_glGenQueries,
      ok: _emscripten_glGenQueriesEXT,
      nk: _emscripten_glGenRenderbuffers,
      mk: _emscripten_glGenSamplers,
      lk: _emscripten_glGenTextures,
      kk: _emscripten_glGenTransformFeedbacks,
      jk: _emscripten_glGenVertexArrays,
      ik: _emscripten_glGenVertexArraysOES,
      hk: _emscripten_glGenerateMipmap,
      gk: _emscripten_glGetActiveAttrib,
      fk: _emscripten_glGetActiveUniform,
      ek: _emscripten_glGetActiveUniformBlockName,
      dk: _emscripten_glGetActiveUniformBlockiv,
      ck: _emscripten_glGetActiveUniformsiv,
      bk: _emscripten_glGetAttachedShaders,
      ak: _emscripten_glGetAttribLocation,
      $j: _emscripten_glGetBooleanv,
      _j: _emscripten_glGetBufferParameteri64v,
      Zj: _emscripten_glGetBufferParameteriv,
      Yj: _emscripten_glGetError,
      Xj: _emscripten_glGetFloatv,
      Wj: _emscripten_glGetFragDataLocation,
      Vj: _emscripten_glGetFramebufferAttachmentParameteriv,
      Uj: _emscripten_glGetInteger64i_v,
      Tj: _emscripten_glGetInteger64v,
      Sj: _emscripten_glGetIntegeri_v,
      Rj: _emscripten_glGetIntegerv,
      Qj: _emscripten_glGetInternalformativ,
      Pj: _emscripten_glGetProgramBinary,
      Oj: _emscripten_glGetProgramInfoLog,
      Nj: _emscripten_glGetProgramiv,
      Mj: _emscripten_glGetQueryObjecti64vEXT,
      Lj: _emscripten_glGetQueryObjectivEXT,
      Kj: _emscripten_glGetQueryObjectui64vEXT,
      Jj: _emscripten_glGetQueryObjectuiv,
      Ij: _emscripten_glGetQueryObjectuivEXT,
      Hj: _emscripten_glGetQueryiv,
      Gj: _emscripten_glGetQueryivEXT,
      Fj: _emscripten_glGetRenderbufferParameteriv,
      Ej: _emscripten_glGetSamplerParameterfv,
      Dj: _emscripten_glGetSamplerParameteriv,
      Cj: _emscripten_glGetShaderInfoLog,
      Bj: _emscripten_glGetShaderPrecisionFormat,
      Aj: _emscripten_glGetShaderSource,
      zj: _emscripten_glGetShaderiv,
      yj: _emscripten_glGetString,
      xj: _emscripten_glGetStringi,
      wj: _emscripten_glGetSynciv,
      vj: _emscripten_glGetTexParameterfv,
      uj: _emscripten_glGetTexParameteriv,
      tj: _emscripten_glGetTransformFeedbackVarying,
      sj: _emscripten_glGetUniformBlockIndex,
      rj: _emscripten_glGetUniformIndices,
      qj: _emscripten_glGetUniformLocation,
      pj: _emscripten_glGetUniformfv,
      oj: _emscripten_glGetUniformiv,
      nj: _emscripten_glGetUniformuiv,
      mj: _emscripten_glGetVertexAttribIiv,
      lj: _emscripten_glGetVertexAttribIuiv,
      kj: _emscripten_glGetVertexAttribPointerv,
      jj: _emscripten_glGetVertexAttribfv,
      ij: _emscripten_glGetVertexAttribiv,
      hj: _emscripten_glHint,
      gj: _emscripten_glInvalidateFramebuffer,
      fj: _emscripten_glInvalidateSubFramebuffer,
      ej: _emscripten_glIsBuffer,
      dj: _emscripten_glIsEnabled,
      cj: _emscripten_glIsFramebuffer,
      bj: _emscripten_glIsProgram,
      aj: _emscripten_glIsQuery,
      $i: _emscripten_glIsQueryEXT,
      _i: _emscripten_glIsRenderbuffer,
      Zi: _emscripten_glIsSampler,
      Yi: _emscripten_glIsShader,
      Xi: _emscripten_glIsSync,
      Wi: _emscripten_glIsTexture,
      Vi: _emscripten_glIsTransformFeedback,
      Ui: _emscripten_glIsVertexArray,
      Ti: _emscripten_glIsVertexArrayOES,
      Si: _emscripten_glLineWidth,
      Ri: _emscripten_glLinkProgram,
      Qi: _emscripten_glPauseTransformFeedback,
      Pi: _emscripten_glPixelStorei,
      Oi: _emscripten_glPolygonOffset,
      Ni: _emscripten_glProgramBinary,
      Mi: _emscripten_glProgramParameteri,
      Li: _emscripten_glQueryCounterEXT,
      Ki: _emscripten_glReadBuffer,
      Ji: _emscripten_glReadPixels,
      Ii: _emscripten_glReleaseShaderCompiler,
      Hi: _emscripten_glRenderbufferStorage,
      Gi: _emscripten_glRenderbufferStorageMultisample,
      Fi: _emscripten_glResumeTransformFeedback,
      Ei: _emscripten_glSampleCoverage,
      Di: _emscripten_glSamplerParameterf,
      Ci: _emscripten_glSamplerParameterfv,
      Bi: _emscripten_glSamplerParameteri,
      Ai: _emscripten_glSamplerParameteriv,
      zi: _emscripten_glScissor,
      yi: _emscripten_glShaderBinary,
      xi: _emscripten_glShaderSource,
      wi: _emscripten_glStencilFunc,
      vi: _emscripten_glStencilFuncSeparate,
      ui: _emscripten_glStencilMask,
      ti: _emscripten_glStencilMaskSeparate,
      si: _emscripten_glStencilOp,
      ri: _emscripten_glStencilOpSeparate,
      qi: _emscripten_glTexImage2D,
      pi: _emscripten_glTexImage3D,
      oi: _emscripten_glTexParameterf,
      ni: _emscripten_glTexParameterfv,
      mi: _emscripten_glTexParameteri,
      li: _emscripten_glTexParameteriv,
      ki: _emscripten_glTexStorage2D,
      ji: _emscripten_glTexStorage3D,
      ii: _emscripten_glTexSubImage2D,
      hi: _emscripten_glTexSubImage3D,
      gi: _emscripten_glTransformFeedbackVaryings,
      fi: _emscripten_glUniform1f,
      ei: _emscripten_glUniform1fv,
      di: _emscripten_glUniform1i,
      ci: _emscripten_glUniform1iv,
      bi: _emscripten_glUniform1ui,
      ai: _emscripten_glUniform1uiv,
      $h: _emscripten_glUniform2f,
      _h: _emscripten_glUniform2fv,
      Zh: _emscripten_glUniform2i,
      Yh: _emscripten_glUniform2iv,
      Xh: _emscripten_glUniform2ui,
      Wh: _emscripten_glUniform2uiv,
      Vh: _emscripten_glUniform3f,
      Uh: _emscripten_glUniform3fv,
      Th: _emscripten_glUniform3i,
      Sh: _emscripten_glUniform3iv,
      Rh: _emscripten_glUniform3ui,
      Qh: _emscripten_glUniform3uiv,
      Ph: _emscripten_glUniform4f,
      Oh: _emscripten_glUniform4fv,
      Nh: _emscripten_glUniform4i,
      Mh: _emscripten_glUniform4iv,
      Lh: _emscripten_glUniform4ui,
      Kh: _emscripten_glUniform4uiv,
      Jh: _emscripten_glUniformBlockBinding,
      Ih: _emscripten_glUniformMatrix2fv,
      Hh: _emscripten_glUniformMatrix2x3fv,
      Gh: _emscripten_glUniformMatrix2x4fv,
      Fh: _emscripten_glUniformMatrix3fv,
      Eh: _emscripten_glUniformMatrix3x2fv,
      Dh: _emscripten_glUniformMatrix3x4fv,
      Ch: _emscripten_glUniformMatrix4fv,
      Bh: _emscripten_glUniformMatrix4x2fv,
      Ah: _emscripten_glUniformMatrix4x3fv,
      zh: _emscripten_glUseProgram,
      yh: _emscripten_glValidateProgram,
      xh: _emscripten_glVertexAttrib1f,
      wh: _emscripten_glVertexAttrib1fv,
      vh: _emscripten_glVertexAttrib2f,
      uh: _emscripten_glVertexAttrib2fv,
      th: _emscripten_glVertexAttrib3f,
      sh: _emscripten_glVertexAttrib3fv,
      rh: _emscripten_glVertexAttrib4f,
      qh: _emscripten_glVertexAttrib4fv,
      ph: _emscripten_glVertexAttribDivisor,
      oh: _emscripten_glVertexAttribDivisorANGLE,
      nh: _emscripten_glVertexAttribDivisorARB,
      mh: _emscripten_glVertexAttribDivisorEXT,
      lh: _emscripten_glVertexAttribDivisorNV,
      kh: _emscripten_glVertexAttribI4i,
      jh: _emscripten_glVertexAttribI4iv,
      ih: _emscripten_glVertexAttribI4ui,
      hh: _emscripten_glVertexAttribI4uiv,
      gh: _emscripten_glVertexAttribIPointer,
      fh: _emscripten_glVertexAttribPointer,
      eh: _emscripten_glViewport,
      dh: _emscripten_glWaitSync,
      _b: _emscripten_has_asyncify,
      ch: _emscripten_memcpy_big,
      bh: _emscripten_request_fullscreen_strategy,
      td: _emscripten_request_pointerlock,
      ah: _emscripten_resize_heap,
      Zb: _emscripten_sample_gamepad_data,
      sd: _emscripten_set_beforeunload_callback_on_thread,
      rd: _emscripten_set_blur_callback_on_thread,
      eb: _emscripten_set_canvas_element_size,
      Yb: _emscripten_set_element_css_size,
      qd: _emscripten_set_focus_callback_on_thread,
      pd: _emscripten_set_fullscreenchange_callback_on_thread,
      ub: _emscripten_set_gamepadconnected_callback_on_thread,
      tb: _emscripten_set_gamepaddisconnected_callback_on_thread,
      od: _emscripten_set_keydown_callback_on_thread,
      nd: _emscripten_set_keypress_callback_on_thread,
      md: _emscripten_set_keyup_callback_on_thread,
      $g: _emscripten_set_main_loop_arg,
      ld: _emscripten_set_mousedown_callback_on_thread,
      kd: _emscripten_set_mouseenter_callback_on_thread,
      jd: _emscripten_set_mouseleave_callback_on_thread,
      id: _emscripten_set_mousemove_callback_on_thread,
      hd: _emscripten_set_mouseup_callback_on_thread,
      gd: _emscripten_set_pointerlockchange_callback_on_thread,
      fd: _emscripten_set_resize_callback_on_thread,
      ed: _emscripten_set_touchcancel_callback_on_thread,
      dd: _emscripten_set_touchend_callback_on_thread,
      cd: _emscripten_set_touchmove_callback_on_thread,
      bd: _emscripten_set_touchstart_callback_on_thread,
      ad: _emscripten_set_visibilitychange_callback_on_thread,
      $c: _emscripten_set_wheel_callback_on_thread,
      Xb: _emscripten_sleep,
      Rm: _environ_get,
      Qm: _environ_sizes_get,
      Wb: _exit,
      xb: _fd_close,
      Pm: _fd_fdstat_get,
      yd: _fd_read,
      Pe: _fd_seek,
      Om: _fd_sync,
      cc: _fd_write,
      _g: _glActiveTexture,
      Zg: _glAttachShader,
      Yg: _glBeginQuery,
      Xg: _glBeginTransformFeedback,
      ba: _glBindBuffer,
      Vb: _glBindBufferBase,
      Ra: _glBindFramebuffer,
      _c: _glBindRenderbuffer,
      Wg: _glBindSampler,
      Vg: _glBindTexture,
      Ub: _glBindVertexArray,
      Zc: _glBlendColor,
      Yc: _glBlendEquation,
      Ug: _glBlendEquationSeparate,
      Xc: _glBlendFunc,
      Tg: _glBlendFuncSeparate,
      Sg: _glBlitFramebuffer,
      sb: _glBufferData,
      Tb: _glBufferSubData,
      Rg: _glCheckFramebufferStatus,
      Wc: _glClear,
      Vc: _glClearColor,
      Qg: _glClearDepthf,
      Pg: _glClearStencil,
      Ne: _glClientWaitSync,
      Sb: _glColorMask,
      Og: _glCompileShader,
      Ng: _glCompressedTexImage2D,
      Mg: _glCompressedTexImage3D,
      Uc: _glCompressedTexSubImage2D,
      Tc: _glCompressedTexSubImage3D,
      Lg: _glCopyBufferSubData,
      Kg: _glCopyTexSubImage2D,
      Jg: _glCopyTexSubImage3D,
      Ig: _glCreateProgram,
      Hg: _glCreateShader,
      Rb: _glCullFace,
      Gg: _glDeleteBuffers,
      Qb: _glDeleteFramebuffers,
      Sc: _glDeleteProgram,
      Fg: _glDeleteQueries,
      db: _glDeleteRenderbuffers,
      Eg: _glDeleteSamplers,
      Dg: _glDeleteShader,
      Rc: _glDeleteSync,
      Qc: _glDeleteTextures,
      Pb: _glDeleteVertexArrays,
      Pc: _glDepthFunc,
      Ob: _glDepthMask,
      Cg: _glDepthRangef,
      va: _glDisable,
      Bg: _glDrawArrays,
      Ag: _glDrawArraysInstanced,
      zg: _glDrawBuffers,
      yg: _glDrawElementsInstanced,
      xg: _glDrawRangeElements,
      Ia: _glEnable,
      Oc: _glEnableVertexAttribArray,
      wg: _glEndQuery,
      vg: _glEndTransformFeedback,
      ug: _glFenceSync,
      tg: _glFramebufferRenderbuffer,
      za: _glFramebufferTexture2D,
      sg: _glFramebufferTextureLayer,
      rg: _glFrontFace,
      Ba: _glGenBuffers,
      qg: _glGenFramebuffers,
      pg: _glGenQueries,
      og: _glGenRenderbuffers,
      ng: _glGenSamplers,
      rb: _glGenTextures,
      Nc: _glGenVertexArrays,
      mg: _glGenerateMipmap,
      lg: _glGetActiveUniform,
      kg: _glGetActiveUniformBlockName,
      jg: _glGetActiveUniformsiv,
      ig: _glGetIntegerv,
      hg: _glGetProgramInfoLog,
      cb: _glGetProgramiv,
      Mc: _glGetQueryObjectuiv,
      gg: _glGetStringi,
      fg: _glGetUniformLocation,
      eg: _glLinkProgram,
      dg: _glPauseTransformFeedback,
      cg: _glReadBuffer,
      bg: _glReadPixels,
      ag: _glRenderbufferStorageMultisample,
      $f: _glResumeTransformFeedback,
      Lc: _glSamplerParameterf,
      Qa: _glSamplerParameteri,
      _f: _glScissor,
      Zf: _glShaderSource,
      Kc: _glStencilFunc,
      Jc: _glStencilFuncSeparate,
      Nb: _glStencilMask,
      Ic: _glStencilMaskSeparate,
      Hc: _glStencilOp,
      Gc: _glStencilOpSeparate,
      Mb: _glTexParameterf,
      ya: _glTexParameteri,
      Fc: _glTexSubImage2D,
      Ec: _glTexSubImage3D,
      Yf: _glTransformFeedbackVaryings,
      Xf: _glUniform1i,
      Wf: _glUniformBlockBinding,
      qb: _glUseProgram,
      Vf: _glVertexAttrib4f,
      Dc: _glVertexAttribDivisor,
      Cc: _glVertexAttribIPointer,
      Bc: _glVertexAttribPointer,
      Ac: _glViewport,
      Uf: _glewInit,
      Xa: invoke_d,
      pb: invoke_ddddddd,
      w: invoke_di,
      ob: invoke_did,
      bb: invoke_didd,
      zc: invoke_didiiii,
      U: invoke_dii,
      ma: invoke_diid,
      ca: invoke_diii,
      Pa: invoke_diiii,
      nb: invoke_diiiid,
      Tf: invoke_f,
      xa: invoke_fi,
      Wa: invoke_fii,
      Lb: invoke_fiii,
      yc: invoke_fiiii,
      m: invoke_i,
      xc: invoke_id,
      Sf: invoke_iddii,
      b: invoke_ii,
      I: invoke_iid,
      wc: invoke_iiddd,
      Rf: invoke_iiddddidddddd,
      Qf: invoke_iiddii,
      N: invoke_iidi,
      ab: invoke_iif,
      Oa: invoke_iifi,
      d: invoke_iii,
      X: invoke_iiid,
      Pf: invoke_iiidd,
      Kb: invoke_iiiddddiiii,
      ja: invoke_iiiddi,
      Aa: invoke_iiiddiiiidiidi,
      $a: invoke_iiidi,
      _: invoke_iiidiii,
      vc: invoke_iiidiiiiii,
      uc: invoke_iiidiiiiiiiii,
      wa: invoke_iiif,
      mb: invoke_iiiffii,
      Of: invoke_iiifii,
      Nf: invoke_iiifiiii,
      g: invoke_iiii,
      Mf: invoke_iiiiddddi,
      tc: invoke_iiiidddiii,
      sc: invoke_iiiiddiiiiidi,
      Lf: invoke_iiiidfiiii,
      Ha: invoke_iiiidii,
      Kf: invoke_iiiidiiii,
      Na: invoke_iiiif,
      Jf: invoke_iiiiffi,
      If: invoke_iiiiffii,
      o: invoke_iiiii,
      lb: invoke_iiiiid,
      W: invoke_iiiiidd,
      Hf: invoke_iiiiidfiiii,
      Gf: invoke_iiiiidii,
      rc: invoke_iiiiidiiii,
      Me: invoke_iiiiidiiiiiij,
      kb: invoke_iiiiif,
      Ma: invoke_iiiiiffi,
      Ff: invoke_iiiiiffiiii,
      v: invoke_iiiiii,
      _a: invoke_iiiiiid,
      Ef: invoke_iiiiiidd,
      Df: invoke_iiiiiiddddddi,
      Cf: invoke_iiiiiidii,
      Bf: invoke_iiiiiiffffi,
      Af: invoke_iiiiiiffi,
      qc: invoke_iiiiiiffiiii,
      t: invoke_iiiiiii,
      pc: invoke_iiiiiiid,
      zf: invoke_iiiiiiidii,
      yf: invoke_iiiiiiidiidii,
      xf: invoke_iiiiiiidiiii,
      Jb: invoke_iiiiiiiffi,
      wf: invoke_iiiiiiififfii,
      x: invoke_iiiiiiii,
      vf: invoke_iiiiiiiiffi,
      ta: invoke_iiiiiiiififfiiif,
      A: invoke_iiiiiiiii,
      uf: invoke_iiiiiiiiiddii,
      O: invoke_iiiiiiiiii,
      T: invoke_iiiiiiiiiii,
      C: invoke_iiiiiiiiiiii,
      H: invoke_iiiiiiiiiiiii,
      La: invoke_iiiiiiiiiiiiii,
      la: invoke_iiiiiiiiiiiiiii,
      tf: invoke_iiiiiiiiiiiiiiii,
      Ib: invoke_iiiiiiiiiiiiiiiii,
      sf: invoke_iiiiiiiiiiiiiiiiii,
      Le: invoke_iiiiiiiij,
      Ke: invoke_iiiiiij,
      Je: invoke_iiiiij,
      Ie: invoke_iiiiiji,
      He: invoke_iiiiijj,
      Ge: invoke_iiiij,
      Fe: invoke_iiiiji,
      Ee: invoke_iiiijiiiiiii,
      De: invoke_iiiijj,
      Ce: invoke_iiij,
      Be: invoke_iiiji,
      Ae: invoke_iiijiiiii,
      ze: invoke_iiijiiiiii,
      ye: invoke_iiijj,
      xe: invoke_iiijjiii,
      we: invoke_iij,
      ve: invoke_iiji,
      ue: invoke_iijj,
      te: invoke_iijjjj,
      se: invoke_iijjjji,
      re: invoke_ij,
      qe: invoke_j,
      pe: invoke_ji,
      oe: invoke_jii,
      ne: invoke_jiii,
      me: invoke_jiiii,
      le: invoke_jij,
      j: invoke_v,
      rf: invoke_vddii,
      jb: invoke_vdiiiiddiiiii,
      qf: invoke_vff,
      pf: invoke_vffff,
      i: invoke_vi,
      P: invoke_vid,
      Z: invoke_viddd,
      Za: invoke_vidddd,
      of: invoke_viddddddii,
      Hb: invoke_viddddi,
      oa: invoke_vidddi,
      nf: invoke_vidddii,
      mf: invoke_viddi,
      lf: invoke_viddiii,
      kf: invoke_viddiiiidii,
      jf: invoke_viddiiiiiidii,
      V: invoke_vidi,
      hf: invoke_vidii,
      Gb: invoke_vidiiii,
      S: invoke_vif,
      gf: invoke_vifffi,
      ff: invoke_vifiii,
      c: invoke_vii,
      R: invoke_viid,
      Ga: invoke_viidd,
      Ka: invoke_viidddddii,
      ef: invoke_viidddi,
      Fa: invoke_viidddii,
      oc: invoke_viiddiii,
      ha: invoke_viidi,
      Va: invoke_viidii,
      Ya: invoke_viidiii,
      nc: invoke_viidiiiiii,
      Fb: invoke_viif,
      Eb: invoke_viififi,
      Ja: invoke_viifii,
      ke: invoke_viifj,
      f: invoke_viii,
      Db: invoke_viiid,
      Cb: invoke_viiidd,
      Bb: invoke_viiidddddi,
      ib: invoke_viiiddddiddii,
      df: invoke_viiiddddiiii,
      hb: invoke_viiidddii,
      ka: invoke_viiiddi,
      Ua: invoke_viiidi,
      cf: invoke_viiidii,
      bf: invoke_viiidiiiiddiiidiiiii,
      mc: invoke_viiif,
      Ab: invoke_viiiff,
      af: invoke_viiifffffffff,
      ia: invoke_viiifi,
      h: invoke_viiii,
      $e: invoke_viiiidd,
      _e: invoke_viiiiddd,
      Ze: invoke_viiiidddddddi,
      zb: invoke_viiiidddi,
      lc: invoke_viiiiddii,
      Ye: invoke_viiiidi,
      Xe: invoke_viiiididd,
      We: invoke_viiiidii,
      Ta: invoke_viiiidiiidii,
      gb: invoke_viiiidiiiiddiiiidiiiii,
      Ve: invoke_viiiiffi,
      Ue: invoke_viiiifi,
      u: invoke_viiiii,
      Te: invoke_viiiiiddd,
      Se: invoke_viiiiidddddddddddddddi,
      kc: invoke_viiiiidddddddi,
      jc: invoke_viiiiidddddi,
      fb: invoke_viiiiiddiiiii,
      ic: invoke_viiiiidii,
      J: invoke_viiiiiffi,
      hc: invoke_viiiiifi,
      q: invoke_viiiiii,
      B: invoke_viiiiiii,
      M: invoke_viiiiiiii,
      Re: invoke_viiiiiiiiddd,
      gc: invoke_viiiiiiiiff,
      E: invoke_viiiiiiiii,
      z: invoke_viiiiiiiiii,
      qa: invoke_viiiiiiiiiii,
      sa: invoke_viiiiiiiiiiiii,
      da: invoke_viiiiiiiiiiiiii,
      Ea: invoke_viiiiiiiiiiiiiii,
      $: invoke_viiiiiiiiiiiiiiii,
      yb: invoke_viiiiiiiiiiiiiiiii,
      K: invoke_viiiiiiiiiiiiiiiiiii,
      aa: invoke_viiiiiiiiiiiiiiiiiiiiiiii,
      je: invoke_viiiiiiiiijiiiiidiiiiiii,
      ie: invoke_viiiiiijii,
      he: invoke_viiiiiijiiiiiiiiffiii,
      ge: invoke_viiiiij,
      fe: invoke_viiiij,
      ee: invoke_viiiijiidiiiiii,
      de: invoke_viiij,
      ce: invoke_viiiji,
      be: invoke_viiijiiiii,
      ae: invoke_viiijj,
      $d: invoke_viij,
      _d: invoke_viiji,
      Zd: invoke_viijii,
      Yd: invoke_viijiiidiiiiiiii,
      Xd: invoke_viijiiiiid,
      Wd: invoke_viijiiiiiiiddddd,
      Vd: invoke_viijiiiiiiiii,
      Ud: invoke_viijiiiiiiiiiii,
      Td: invoke_viijiiiiiiiiiiiii,
      Sd: invoke_viijj,
      Rd: invoke_vij,
      Qd: invoke_vijii,
      Pd: invoke_vijiiii,
      Od: invoke_vj,
      Nd: invoke_vjiiii,
      Md: invoke_vjjiiii,
      Ld: invoke_vjjiijiijiiii,
      p: _llvm_eh_typeid_for,
      fc: _re_emscripten_async_wget2_data,
      Kd: _re_emscripten_call_worker,
      Jd: _re_emscripten_create_worker,
      Id: _re_emscripten_destroy_worker,
      Hd: _re_emscripten_egl_set_golmultisample_enable,
      ec: _re_emscripten_enable_worker,
      dc: _re_emscripten_env_init,
      Gd: _re_emscripten_get_worker_queue_size,
      Fd: _re_emscripten_idb_async_load,
      Ed: _re_emscripten_idb_async_store,
      Dd: _re_emscripten_worker_respond,
      Cd: _re_emscripten_worker_respond_provisionally,
      Bd: _strftime,
      ra: _strftime_l
    }
    var asm = createWasm()
    var ___wasm_call_ctors = function () {
      return (___wasm_call_ctors = Module['asm']['hn']).apply(null, arguments)
    }
    var ___cxa_free_exception = function () {
      return (___cxa_free_exception = Module['asm']['jn']).apply(null, arguments)
    }
    var _memcpy = function () {
      return (_memcpy = Module['asm']['memcpy']).apply(null, arguments)
    }
    var _WebWorkerSetPGolData = (Module['_WebWorkerSetPGolData'] = function () {
      return (_WebWorkerSetPGolData = Module['_WebWorkerSetPGolData'] = Module['asm']['ln']).apply(null, arguments)
    })
    var _WebWorkerEngineDeferLoadMainEntry = (Module['_WebWorkerEngineDeferLoadMainEntry'] = function () {
      return (_WebWorkerEngineDeferLoadMainEntry = Module['_WebWorkerEngineDeferLoadMainEntry'] =
        Module['asm']['mn']).apply(null, arguments)
    })
    var _main = (Module['_main'] = function () {
      return (_main = Module['_main'] = Module['asm']['nn']).apply(null, arguments)
    })
    var _malloc = function () {
      return (_malloc = Module['asm']['on']).apply(null, arguments)
    }
    var _free = function () {
      return (_free = Module['asm']['pn']).apply(null, arguments)
    }
    var ___errno_location = function () {
      return (___errno_location = Module['asm']['qn']).apply(null, arguments)
    }
    var setTempRet0 = function () {
      return (setTempRet0 = Module['asm']['rn']).apply(null, arguments)
    }
    var _saveSetjmp = function () {
      return (_saveSetjmp = Module['asm']['saveSetjmp']).apply(null, arguments)
    }
    var ___getTypeName = (Module['___getTypeName'] = function () {
      return (___getTypeName = Module['___getTypeName'] = Module['asm']['sn']).apply(null, arguments)
    })
    var __embind_initialize_bindings = (Module['__embind_initialize_bindings'] = function () {
      return (__embind_initialize_bindings = Module['__embind_initialize_bindings'] = Module['asm']['tn']).apply(
        null,
        arguments
      )
    })
    var _emscripten_builtin_memalign = function () {
      return (_emscripten_builtin_memalign = Module['asm']['un']).apply(null, arguments)
    }
    var _setThrew = function () {
      return (_setThrew = Module['asm']['vn']).apply(null, arguments)
    }
    var stackSave = function () {
      return (stackSave = Module['asm']['wn']).apply(null, arguments)
    }
    var stackRestore = function () {
      return (stackRestore = Module['asm']['xn']).apply(null, arguments)
    }
    var stackAlloc = function () {
      return (stackAlloc = Module['asm']['yn']).apply(null, arguments)
    }
    var ___cxa_can_catch = function () {
      return (___cxa_can_catch = Module['asm']['zn']).apply(null, arguments)
    }
    var ___cxa_is_pointer_type = function () {
      return (___cxa_is_pointer_type = Module['asm']['An']).apply(null, arguments)
    }
    var dynCall_vij = (Module['dynCall_vij'] = function () {
      return (dynCall_vij = Module['dynCall_vij'] = Module['asm']['Bn']).apply(null, arguments)
    })
    var dynCall_viiiij = (Module['dynCall_viiiij'] = function () {
      return (dynCall_viiiij = Module['dynCall_viiiij'] = Module['asm']['Cn']).apply(null, arguments)
    })
    var dynCall_j = (Module['dynCall_j'] = function () {
      return (dynCall_j = Module['dynCall_j'] = Module['asm']['Dn']).apply(null, arguments)
    })
    var dynCall_iiji = (Module['dynCall_iiji'] = function () {
      return (dynCall_iiji = Module['dynCall_iiji'] = Module['asm']['En']).apply(null, arguments)
    })
    var dynCall_viiijj = (Module['dynCall_viiijj'] = function () {
      return (dynCall_viiijj = Module['dynCall_viiijj'] = Module['asm']['Fn']).apply(null, arguments)
    })
    var dynCall_vj = (Module['dynCall_vj'] = function () {
      return (dynCall_vj = Module['dynCall_vj'] = Module['asm']['Gn']).apply(null, arguments)
    })
    var dynCall_iiiijj = (Module['dynCall_iiiijj'] = function () {
      return (dynCall_iiiijj = Module['dynCall_iiiijj'] = Module['asm']['Hn']).apply(null, arguments)
    })
    var dynCall_iiiiijj = (Module['dynCall_iiiiijj'] = function () {
      return (dynCall_iiiiijj = Module['dynCall_iiiiijj'] = Module['asm']['In']).apply(null, arguments)
    })
    var dynCall_iiiji = (Module['dynCall_iiiji'] = function () {
      return (dynCall_iiiji = Module['dynCall_iiiji'] = Module['asm']['Jn']).apply(null, arguments)
    })
    var dynCall_viij = (Module['dynCall_viij'] = function () {
      return (dynCall_viij = Module['dynCall_viij'] = Module['asm']['Kn']).apply(null, arguments)
    })
    var dynCall_jii = (Module['dynCall_jii'] = function () {
      return (dynCall_jii = Module['dynCall_jii'] = Module['asm']['Ln']).apply(null, arguments)
    })
    var dynCall_ji = (Module['dynCall_ji'] = function () {
      return (dynCall_ji = Module['dynCall_ji'] = Module['asm']['Mn']).apply(null, arguments)
    })
    var dynCall_iij = (Module['dynCall_iij'] = function () {
      return (dynCall_iij = Module['dynCall_iij'] = Module['asm']['Nn']).apply(null, arguments)
    })
    var dynCall_viiijiiiii = (Module['dynCall_viiijiiiii'] = function () {
      return (dynCall_viiijiiiii = Module['dynCall_viiijiiiii'] = Module['asm']['On']).apply(null, arguments)
    })
    var dynCall_jiiii = (Module['dynCall_jiiii'] = function () {
      return (dynCall_jiiii = Module['dynCall_jiiii'] = Module['asm']['Pn']).apply(null, arguments)
    })
    var dynCall_viiij = (Module['dynCall_viiij'] = function () {
      return (dynCall_viiij = Module['dynCall_viiij'] = Module['asm']['Qn']).apply(null, arguments)
    })
    var dynCall_viifj = (Module['dynCall_viifj'] = function () {
      return (dynCall_viifj = Module['dynCall_viifj'] = Module['asm']['Rn']).apply(null, arguments)
    })
    var dynCall_iiijjiii = (Module['dynCall_iiijjiii'] = function () {
      return (dynCall_iiijjiii = Module['dynCall_iiijjiii'] = Module['asm']['Sn']).apply(null, arguments)
    })
    var dynCall_viijiiiiiiiiiiiii = (Module['dynCall_viijiiiiiiiiiiiii'] = function () {
      return (dynCall_viijiiiiiiiiiiiii = Module['dynCall_viijiiiiiiiiiiiii'] = Module['asm']['Tn']).apply(
        null,
        arguments
      )
    })
    var dynCall_viijiiiiiiiiiii = (Module['dynCall_viijiiiiiiiiiii'] = function () {
      return (dynCall_viijiiiiiiiiiii = Module['dynCall_viijiiiiiiiiiii'] = Module['asm']['Un']).apply(null, arguments)
    })
    var dynCall_viiiiiiiiijiiiiidiiiiiii = (Module['dynCall_viiiiiiiiijiiiiidiiiiiii'] = function () {
      return (dynCall_viiiiiiiiijiiiiidiiiiiii = Module['dynCall_viiiiiiiiijiiiiidiiiiiii'] =
        Module['asm']['Vn']).apply(null, arguments)
    })
    var dynCall_iiij = (Module['dynCall_iiij'] = function () {
      return (dynCall_iiij = Module['dynCall_iiij'] = Module['asm']['Wn']).apply(null, arguments)
    })
    var dynCall_viiiijiidiiiiii = (Module['dynCall_viiiijiidiiiiii'] = function () {
      return (dynCall_viiiijiidiiiiii = Module['dynCall_viiiijiidiiiiii'] = Module['asm']['Xn']).apply(null, arguments)
    })
    var dynCall_viiiiiijii = (Module['dynCall_viiiiiijii'] = function () {
      return (dynCall_viiiiiijii = Module['dynCall_viiiiiijii'] = Module['asm']['Yn']).apply(null, arguments)
    })
    var dynCall_jij = (Module['dynCall_jij'] = function () {
      return (dynCall_jij = Module['dynCall_jij'] = Module['asm']['Zn']).apply(null, arguments)
    })
    var dynCall_vjjiijiijiiii = (Module['dynCall_vjjiijiijiiii'] = function () {
      return (dynCall_vjjiijiijiiii = Module['dynCall_vjjiijiijiiii'] = Module['asm']['_n']).apply(null, arguments)
    })
    var dynCall_vjjiiii = (Module['dynCall_vjjiiii'] = function () {
      return (dynCall_vjjiiii = Module['dynCall_vjjiiii'] = Module['asm']['$n']).apply(null, arguments)
    })
    var dynCall_iiiij = (Module['dynCall_iiiij'] = function () {
      return (dynCall_iiiij = Module['dynCall_iiiij'] = Module['asm']['ao']).apply(null, arguments)
    })
    var dynCall_iiiiij = (Module['dynCall_iiiiij'] = function () {
      return (dynCall_iiiiij = Module['dynCall_iiiiij'] = Module['asm']['bo']).apply(null, arguments)
    })
    var dynCall_viiiiij = (Module['dynCall_viiiiij'] = function () {
      return (dynCall_viiiiij = Module['dynCall_viiiiij'] = Module['asm']['co']).apply(null, arguments)
    })
    var dynCall_viijiiiiiiiddddd = (Module['dynCall_viijiiiiiiiddddd'] = function () {
      return (dynCall_viijiiiiiiiddddd = Module['dynCall_viijiiiiiiiddddd'] = Module['asm']['eo']).apply(
        null,
        arguments
      )
    })
    var dynCall_ij = (Module['dynCall_ij'] = function () {
      return (dynCall_ij = Module['dynCall_ij'] = Module['asm']['fo']).apply(null, arguments)
    })
    var dynCall_viijiiiiiiiii = (Module['dynCall_viijiiiiiiiii'] = function () {
      return (dynCall_viijiiiiiiiii = Module['dynCall_viijiiiiiiiii'] = Module['asm']['go']).apply(null, arguments)
    })
    var dynCall_viijii = (Module['dynCall_viijii'] = function () {
      return (dynCall_viijii = Module['dynCall_viijii'] = Module['asm']['ho']).apply(null, arguments)
    })
    var dynCall_viiiiiijiiiiiiiiffiii = (Module['dynCall_viiiiiijiiiiiiiiffiii'] = function () {
      return (dynCall_viiiiiijiiiiiiiiffiii = Module['dynCall_viiiiiijiiiiiiiiffiii'] = Module['asm']['io']).apply(
        null,
        arguments
      )
    })
    var dynCall_viijiiiiid = (Module['dynCall_viijiiiiid'] = function () {
      return (dynCall_viijiiiiid = Module['dynCall_viijiiiiid'] = Module['asm']['jo']).apply(null, arguments)
    })
    var dynCall_iiiiiiiij = (Module['dynCall_iiiiiiiij'] = function () {
      return (dynCall_iiiiiiiij = Module['dynCall_iiiiiiiij'] = Module['asm']['ko']).apply(null, arguments)
    })
    var dynCall_vijii = (Module['dynCall_vijii'] = function () {
      return (dynCall_vijii = Module['dynCall_vijii'] = Module['asm']['lo']).apply(null, arguments)
    })
    var dynCall_vijiiii = (Module['dynCall_vijiiii'] = function () {
      return (dynCall_vijiiii = Module['dynCall_vijiiii'] = Module['asm']['mo']).apply(null, arguments)
    })
    var dynCall_iijjjj = (Module['dynCall_iijjjj'] = function () {
      return (dynCall_iijjjj = Module['dynCall_iijjjj'] = Module['asm']['no']).apply(null, arguments)
    })
    var dynCall_viijiiidiiiiiiii = (Module['dynCall_viijiiidiiiiiiii'] = function () {
      return (dynCall_viijiiidiiiiiiii = Module['dynCall_viijiiidiiiiiiii'] = Module['asm']['oo']).apply(
        null,
        arguments
      )
    })
    var dynCall_iiiijiiiiiii = (Module['dynCall_iiiijiiiiiii'] = function () {
      return (dynCall_iiiijiiiiiii = Module['dynCall_iiiijiiiiiii'] = Module['asm']['po']).apply(null, arguments)
    })
    var dynCall_iiiiiij = (Module['dynCall_iiiiiij'] = function () {
      return (dynCall_iiiiiij = Module['dynCall_iiiiiij'] = Module['asm']['qo']).apply(null, arguments)
    })
    var dynCall_vjiiii = (Module['dynCall_vjiiii'] = function () {
      return (dynCall_vjiiii = Module['dynCall_vjiiii'] = Module['asm']['ro']).apply(null, arguments)
    })
    var dynCall_viiji = (Module['dynCall_viiji'] = function () {
      return (dynCall_viiji = Module['dynCall_viiji'] = Module['asm']['so']).apply(null, arguments)
    })
    var dynCall_viijiii = (Module['dynCall_viijiii'] = function () {
      return (dynCall_viijiii = Module['dynCall_viijiii'] = Module['asm']['to']).apply(null, arguments)
    })
    var dynCall_jiii = (Module['dynCall_jiii'] = function () {
      return (dynCall_jiii = Module['dynCall_jiii'] = Module['asm']['uo']).apply(null, arguments)
    })
    var dynCall_iiijii = (Module['dynCall_iiijii'] = function () {
      return (dynCall_iiijii = Module['dynCall_iiijii'] = Module['asm']['vo']).apply(null, arguments)
    })
    var dynCall_viijj = (Module['dynCall_viijj'] = function () {
      return (dynCall_viijj = Module['dynCall_viijj'] = Module['asm']['wo']).apply(null, arguments)
    })
    var dynCall_jiji = (Module['dynCall_jiji'] = function () {
      return (dynCall_jiji = Module['dynCall_jiji'] = Module['asm']['xo']).apply(null, arguments)
    })
    var dynCall_iiiiiji = (Module['dynCall_iiiiiji'] = function () {
      return (dynCall_iiiiiji = Module['dynCall_iiiiiji'] = Module['asm']['yo']).apply(null, arguments)
    })
    var dynCall_viiiji = (Module['dynCall_viiiji'] = function () {
      return (dynCall_viiiji = Module['dynCall_viiiji'] = Module['asm']['zo']).apply(null, arguments)
    })
    var dynCall_iiijiiiiii = (Module['dynCall_iiijiiiiii'] = function () {
      return (dynCall_iiijiiiiii = Module['dynCall_iiijiiiiii'] = Module['asm']['Ao']).apply(null, arguments)
    })
    var dynCall_iijii = (Module['dynCall_iijii'] = function () {
      return (dynCall_iijii = Module['dynCall_iijii'] = Module['asm']['Bo']).apply(null, arguments)
    })
    var dynCall_iiiiji = (Module['dynCall_iiiiji'] = function () {
      return (dynCall_iiiiji = Module['dynCall_iiiiji'] = Module['asm']['Co']).apply(null, arguments)
    })
    var dynCall_iijj = (Module['dynCall_iijj'] = function () {
      return (dynCall_iijj = Module['dynCall_iijj'] = Module['asm']['Do']).apply(null, arguments)
    })
    var dynCall_iiiiidiiiiiij = (Module['dynCall_iiiiidiiiiiij'] = function () {
      return (dynCall_iiiiidiiiiiij = Module['dynCall_iiiiidiiiiiij'] = Module['asm']['Eo']).apply(null, arguments)
    })
    var dynCall_iiijj = (Module['dynCall_iiijj'] = function () {
      return (dynCall_iiijj = Module['dynCall_iiijj'] = Module['asm']['Fo']).apply(null, arguments)
    })
    var dynCall_iijjjji = (Module['dynCall_iijjjji'] = function () {
      return (dynCall_iijjjji = Module['dynCall_iijjjji'] = Module['asm']['Go']).apply(null, arguments)
    })
    var dynCall_iiiiiijj = (Module['dynCall_iiiiiijj'] = function () {
      return (dynCall_iiiiiijj = Module['dynCall_iiiiiijj'] = Module['asm']['Ho']).apply(null, arguments)
    })
    var dynCall_iiijiiiii = (Module['dynCall_iiijiiiii'] = function () {
      return (dynCall_iiijiiiii = Module['dynCall_iiijiiiii'] = Module['asm']['Io']).apply(null, arguments)
    })
    function invoke_vi(index, a1) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_vii(index, a1, a2) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_ii(index, a1) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iii(index, a1, a2) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_v(index) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)()
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viii(index, a1, a2, a3) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiii(index, a1, a2, a3, a4) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiii(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiifii(index, a1, a2, a3, a4, a5) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiii(index, a1, a2, a3, a4, a5) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiii(index, a1, a2, a3) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_fiiii(index, a1, a2, a3, a4) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiii(index, a1, a2, a3, a4) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_di(index, a1) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiii(index, a1, a2, a3, a4, a5) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiddi(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiii(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iifi(index, a1, a2, a3) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiiddiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_i(index) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)()
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiiiiiiiiiiiiii(
      index,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9,
      a10,
      a11,
      a12,
      a13,
      a14,
      a15,
      a16,
      a17
    ) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiidiiiiddiiiidiiiii(
      index,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9,
      a10,
      a11,
      a12,
      a13,
      a14,
      a15,
      a16,
      a17,
      a18,
      a19,
      a20,
      a21
    ) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(
          a1,
          a2,
          a3,
          a4,
          a5,
          a6,
          a7,
          a8,
          a9,
          a10,
          a11,
          a12,
          a13,
          a14,
          a15,
          a16,
          a17,
          a18,
          a19,
          a20,
          a21
        )
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiidd(index, a1, a2, a3, a4) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_vif(index, a1, a2) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_fi(index, a1) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiidii(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiidii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiid(index, a1, a2, a3, a4) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_vid(index, a1, a2) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiid(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viif(index, a1, a2, a3) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_fii(index, a1, a2) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiidd(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiif(index, a1, a2, a3, a4) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiif(index, a1, a2, a3, a4) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_fiii(index, a1, a2, a3) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiifi(index, a1, a2, a3, a4, a5, a6, a7) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_dii(index, a1, a2) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiidddiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiddddi(index, a1, a2, a3, a4, a5, a6, a7, a8) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiidi(index, a1, a2, a3, a4, a5) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viid(index, a1, a2, a3) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiddii(index, a1, a2, a3, a4, a5) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiid(index, a1, a2, a3) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiffi(index, a1, a2, a3, a4, a5, a6, a7) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiif(index, a1, a2, a3) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiifiiii(index, a1, a2, a3, a4, a5, a6, a7) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiiiiffi(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiiiififfiiif(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiiiffi(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiiffiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiidii(index, a1, a2, a3, a4, a5, a6, a7) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiidiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiidfiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiidd(index, a1, a2, a3, a4, a5, a6, a7) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiiidii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_vidddii(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiiffi(index, a1, a2, a3, a4, a5, a6, a7, a8) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiiddd(index, a1, a2, a3, a4, a5, a6, a7, a8) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_vidddd(index, a1, a2, a3, a4, a5) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiidiiiiddiiidiiiii(
      index,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9,
      a10,
      a11,
      a12,
      a13,
      a14,
      a15,
      a16,
      a17,
      a18,
      a19
    ) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiidi(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiid(index, a1, a2, a3, a4, a5) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiidd(index, a1, a2, a3, a4, a5) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiifi(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiddii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiidii(index, a1, a2, a3, a4, a5, a6, a7) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iddii(index, a1, a2, a3, a4) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iid(index, a1, a2) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiffi(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iif(index, a1, a2) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_vifiii(index, a1, a2, a3, a4, a5) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiiififfii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiiffi(index, a1, a2, a3, a4, a5, a6, a7, a8) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiffiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiidiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiidfiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiidd(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiidii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiffi(index, a1, a2, a3, a4, a5, a6, a7) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiddd(index, a1, a2, a3, a4, a5, a6, a7) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_d(index) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)()
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_diii(index, a1, a2, a3) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viidddi(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiiiiiiiiiiiiiiii(
      index,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9,
      a10,
      a11,
      a12,
      a13,
      a14,
      a15,
      a16,
      a17,
      a18,
      a19
    ) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiifi(index, a1, a2, a3, a4, a5) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiiiiiddd(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_vifffi(index, a1, a2, a3, a4, a5) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiiiiiiiiiiiiiiiiiiiii(
      index,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9,
      a10,
      a11,
      a12,
      a13,
      a14,
      a15,
      a16,
      a17,
      a18,
      a19,
      a20,
      a21,
      a22,
      a23,
      a24
    ) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(
          a1,
          a2,
          a3,
          a4,
          a5,
          a6,
          a7,
          a8,
          a9,
          a10,
          a11,
          a12,
          a13,
          a14,
          a15,
          a16,
          a17,
          a18,
          a19,
          a20,
          a21,
          a22,
          a23,
          a24
        )
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiiidiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viidi(index, a1, a2, a3, a4) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_vidddi(index, a1, a2, a3, a4, a5) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iidi(index, a1, a2, a3) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viififi(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiidii(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiiiiiiiiiiiiii(
      index,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9,
      a10,
      a11,
      a12,
      a13,
      a14,
      a15,
      a16,
      a17
    ) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_vidi(index, a1, a2, a3) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiddd(index, a1, a2, a3, a4) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_diiii(index, a1, a2, a3, a4) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiddddiddii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiiiiiff(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiidiiidii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiff(index, a1, a2, a3, a4, a5) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiddddiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_f(index) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)()
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiiffffi(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_vff(index, a1, a2) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viifii(index, a1, a2, a3, a4, a5) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiffii(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiffii(index, a1, a2, a3, a4, a5, a6, a7) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiiiiiddii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiifffffffff(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viddiiiiiidii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiididd(index, a1, a2, a3, a4, a5, a6, a7, a8) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiif(index, a1, a2, a3, a4, a5) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_diid(index, a1, a2, a3) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiidiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viidiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiidiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiiddddddi(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiddddidddddd(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_vdiiiiddiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_vffff(index, a1, a2, a3, a4) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiddddiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viddddi(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiidiii(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viidd(index, a1, a2, a3, a4) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viddi(index, a1, a2, a3, a4) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_id(index, a1) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viidii(index, a1, a2, a3, a4, a5) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiidddi(index, a1, a2, a3, a4, a5, a6, a7, a8) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiidddddddi(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiidddddddddddddddi(
      index,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9,
      a10,
      a11,
      a12,
      a13,
      a14,
      a15,
      a16,
      a17,
      a18,
      a19,
      a20,
      a21
    ) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(
          a1,
          a2,
          a3,
          a4,
          a5,
          a6,
          a7,
          a8,
          a9,
          a10,
          a11,
          a12,
          a13,
          a14,
          a15,
          a16,
          a17,
          a18,
          a19,
          a20,
          a21
        )
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiidddddddi(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiidddddi(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_did(index, a1, a2) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viddiiiidii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viddiii(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiddi(index, a1, a2, a3, a4, a5) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viidiii(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiidi(index, a1, a2, a3, a4) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_diiiid(index, a1, a2, a3, a4, a5) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiidddii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viidddii(index, a1, a2, a3, a4, a5, a6, a7) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viddd(index, a1, a2, a3, a4) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_didd(index, a1, a2, a3) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_didiiii(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiidddddi(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiddiiiidiidi(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_vidiiii(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiddiii(index, a1, a2, a3, a4, a5, a6, a7) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viidddddii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_vidii(index, a1, a2, a3, a4) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiddiiiiidi(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiiidiidii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiiid(index, a1, a2, a3, a4, a5, a6, a7) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_vddii(index, a1, a2, a3, a4) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viddddddii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
      var sp = stackSave()
      try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_ddddddd(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiji(index, a1, a2, a3, a4) {
      var sp = stackSave()
      try {
        return dynCall_iiji(index, a1, a2, a3, a4)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiij(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        dynCall_viiiij(index, a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiijj(index, a1, a2, a3, a4, a5, a6, a7) {
      var sp = stackSave()
      try {
        return dynCall_iiiijj(index, a1, a2, a3, a4, a5, a6, a7)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_jii(index, a1, a2) {
      var sp = stackSave()
      try {
        return dynCall_jii(index, a1, a2)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viij(index, a1, a2, a3, a4) {
      var sp = stackSave()
      try {
        dynCall_viij(index, a1, a2, a3, a4)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiijj(index, a1, a2, a3, a4, a5, a6, a7, a8) {
      var sp = stackSave()
      try {
        return dynCall_iiiiijj(index, a1, a2, a3, a4, a5, a6, a7, a8)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiji(index, a1, a2, a3, a4, a5) {
      var sp = stackSave()
      try {
        return dynCall_iiiji(index, a1, a2, a3, a4, a5)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_j(index) {
      var sp = stackSave()
      try {
        return dynCall_j(index)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viijiiiiiiiiiiiii(
      index,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9,
      a10,
      a11,
      a12,
      a13,
      a14,
      a15,
      a16,
      a17
    ) {
      var sp = stackSave()
      try {
        dynCall_viijiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiijj(index, a1, a2, a3, a4, a5, a6, a7) {
      var sp = stackSave()
      try {
        dynCall_viiijj(index, a1, a2, a3, a4, a5, a6, a7)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_ji(index, a1) {
      var sp = stackSave()
      try {
        return dynCall_ji(index, a1)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiijiidiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
      var sp = stackSave()
      try {
        dynCall_viiiijiidiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_vj(index, a1, a2) {
      var sp = stackSave()
      try {
        dynCall_vj(index, a1, a2)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iij(index, a1, a2, a3) {
      var sp = stackSave()
      try {
        return dynCall_iij(index, a1, a2, a3)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiiijii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
      var sp = stackSave()
      try {
        dynCall_viiiiiijii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiijiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
      var sp = stackSave()
      try {
        dynCall_viiijiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_vij(index, a1, a2, a3) {
      var sp = stackSave()
      try {
        dynCall_vij(index, a1, a2, a3)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_jiiii(index, a1, a2, a3, a4) {
      var sp = stackSave()
      try {
        return dynCall_jiiii(index, a1, a2, a3, a4)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiiiiiijiiiiidiiiiiii(
      index,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9,
      a10,
      a11,
      a12,
      a13,
      a14,
      a15,
      a16,
      a17,
      a18,
      a19,
      a20,
      a21,
      a22,
      a23,
      a24
    ) {
      var sp = stackSave()
      try {
        dynCall_viiiiiiiiijiiiiidiiiiiii(
          index,
          a1,
          a2,
          a3,
          a4,
          a5,
          a6,
          a7,
          a8,
          a9,
          a10,
          a11,
          a12,
          a13,
          a14,
          a15,
          a16,
          a17,
          a18,
          a19,
          a20,
          a21,
          a22,
          a23,
          a24
        )
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiij(index, a1, a2, a3, a4, a5) {
      var sp = stackSave()
      try {
        dynCall_viiij(index, a1, a2, a3, a4, a5)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viijii(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        dynCall_viijii(index, a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiij(index, a1, a2, a3, a4, a5) {
      var sp = stackSave()
      try {
        return dynCall_iiiij(index, a1, a2, a3, a4, a5)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiij(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        return dynCall_iiiiij(index, a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viijiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
      var sp = stackSave()
      try {
        dynCall_viijiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiij(index, a1, a2, a3, a4, a5, a6, a7) {
      var sp = stackSave()
      try {
        dynCall_viiiiij(index, a1, a2, a3, a4, a5, a6, a7)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viijiiiiiiiddddd(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16) {
      var sp = stackSave()
      try {
        dynCall_viijiiiiiiiddddd(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viijiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
      var sp = stackSave()
      try {
        dynCall_viijiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_ij(index, a1, a2) {
      var sp = stackSave()
      try {
        return dynCall_ij(index, a1, a2)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiijjiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
      var sp = stackSave()
      try {
        return dynCall_iiijjiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viijiiiiid(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
      var sp = stackSave()
      try {
        dynCall_viijiiiiid(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiiiij(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
      var sp = stackSave()
      try {
        return dynCall_iiiiiiiij(index, a1, a2, a3, a4, a5, a6, a7, a8, a9)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_vijii(index, a1, a2, a3, a4, a5) {
      var sp = stackSave()
      try {
        dynCall_vijii(index, a1, a2, a3, a4, a5)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_vijiiii(index, a1, a2, a3, a4, a5, a6, a7) {
      var sp = stackSave()
      try {
        dynCall_vijiiii(index, a1, a2, a3, a4, a5, a6, a7)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iijjjj(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
      var sp = stackSave()
      try {
        return dynCall_iijjjj(index, a1, a2, a3, a4, a5, a6, a7, a8, a9)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiijiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
      var sp = stackSave()
      try {
        return dynCall_iiiijiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viijiiidiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16) {
      var sp = stackSave()
      try {
        dynCall_viijiiidiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiij(index, a1, a2, a3, a4, a5, a6, a7) {
      var sp = stackSave()
      try {
        return dynCall_iiiiiij(index, a1, a2, a3, a4, a5, a6, a7)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_vjiiii(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        dynCall_vjiiii(index, a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiji(index, a1, a2, a3, a4, a5) {
      var sp = stackSave()
      try {
        dynCall_viiji(index, a1, a2, a3, a4, a5)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viifj(index, a1, a2, a3, a4, a5) {
      var sp = stackSave()
      try {
        dynCall_viifj(index, a1, a2, a3, a4, a5)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiiiijiiiiiiiiffiii(
      index,
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      a8,
      a9,
      a10,
      a11,
      a12,
      a13,
      a14,
      a15,
      a16,
      a17,
      a18,
      a19,
      a20,
      a21
    ) {
      var sp = stackSave()
      try {
        dynCall_viiiiiijiiiiiiiiffiii(
          index,
          a1,
          a2,
          a3,
          a4,
          a5,
          a6,
          a7,
          a8,
          a9,
          a10,
          a11,
          a12,
          a13,
          a14,
          a15,
          a16,
          a17,
          a18,
          a19,
          a20,
          a21
        )
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viijj(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        dynCall_viijj(index, a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_jij(index, a1, a2, a3) {
      var sp = stackSave()
      try {
        return dynCall_jij(index, a1, a2, a3)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_vjjiijiijiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16) {
      var sp = stackSave()
      try {
        dynCall_vjjiijiijiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_vjjiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
      var sp = stackSave()
      try {
        dynCall_vjjiiii(index, a1, a2, a3, a4, a5, a6, a7, a8)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiij(index, a1, a2, a3, a4) {
      var sp = stackSave()
      try {
        return dynCall_iiij(index, a1, a2, a3, a4)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_jiii(index, a1, a2, a3) {
      var sp = stackSave()
      try {
        return dynCall_jiii(index, a1, a2, a3)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiiji(index, a1, a2, a3, a4, a5, a6, a7) {
      var sp = stackSave()
      try {
        return dynCall_iiiiiji(index, a1, a2, a3, a4, a5, a6, a7)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiijiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
      var sp = stackSave()
      try {
        return dynCall_iiijiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_viiiji(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        dynCall_viiiji(index, a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiijiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
      var sp = stackSave()
      try {
        return dynCall_iiijiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiji(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        return dynCall_iiiiji(index, a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iijj(index, a1, a2, a3, a4, a5) {
      var sp = stackSave()
      try {
        return dynCall_iijj(index, a1, a2, a3, a4, a5)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiiiidiiiiiij(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
      var sp = stackSave()
      try {
        return dynCall_iiiiidiiiiiij(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iiijj(index, a1, a2, a3, a4, a5, a6) {
      var sp = stackSave()
      try {
        return dynCall_iiijj(index, a1, a2, a3, a4, a5, a6)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    function invoke_iijjjji(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
      var sp = stackSave()
      try {
        return dynCall_iijjjji(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
      } catch (e) {
        stackRestore(sp)
        if (e !== e + 0) throw e
        _setThrew(1, 0)
      }
    }
    var calledRun
    dependenciesFulfilled = function runCaller() {
      if (!calledRun) run()
      if (!calledRun) dependenciesFulfilled = runCaller
    }
    function callMain(args = []) {
      var entryFunction = _main
      args.unshift(thisProgram)
      var argc = args.length
      var argv = stackAlloc((argc + 1) * 4)
      var argv_ptr = argv >> 2
      args.forEach((arg) => {
        HEAP32[argv_ptr++] = allocateUTF8OnStack(arg)
      })
      HEAP32[argv_ptr] = 0
      try {
        var ret = entryFunction(argc, argv)
        exitJS(ret, true)
        return ret
      } catch (e) {
        return handleException(e)
      }
    }
    function run(args = arguments_) {
      if (runDependencies > 0) {
        return
      }
      preRun()
      if (runDependencies > 0) {
        return
      }
      function doRun() {
        if (calledRun) return
        calledRun = true
        Module['calledRun'] = true
        if (ABORT) return
        initRuntime()
        preMain()
        readyPromiseResolve(Module)
        if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']()
        if (shouldRunNow) callMain(args)
        postRun()
      }
      if (Module['setStatus']) {
        Module['setStatus']('Running...')
        setTimeout(function () {
          setTimeout(function () {
            Module['setStatus']('')
          }, 1)
          doRun()
        }, 1)
      } else {
        doRun()
      }
    }
    if (Module['preInit']) {
      if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']]
      while (Module['preInit'].length > 0) {
        Module['preInit'].pop()()
      }
    }
    var shouldRunNow = true
    if (Module['noInitialRun']) shouldRunNow = false
    run()
    var workerenable = 1
    var workerResponded = true,
      workerCallbackId = -1
    var workertempbuffer = 0,
      workertempbuffersize = 0
    var workertaskbuffer = []
    var workerimmeproc = 0
    var workerCallbackId_imme = -1
    var workertempbuffer_imme = 0,
      workertempbuffersize_imme = 0
    function procworkertask(msg) {
      var func = Module['_' + msg.data['funcName']]
      if (!func) throw 'invalid worker function to call: ' + msg.data['funcName']
      var data = msg.data['data']
      var extbufs = msg.data['extbufs']
      if (workerimmeproc > 0) {
        if (data) {
          if (!data.byteLength) data = new Uint8Array(data)
          if (!workertempbuffer_imme || workertempbuffersize_imme < 4 * extbufs.length + data.length) {
            if (workertempbuffer_imme) _free(workertempbuffer_imme)
            workertempbuffersize_imme = 4 * extbufs.length + data.length
            workertempbuffer_imme = _malloc(workertempbuffersize_imme)
          }
          HEAPU8.set(data, workertempbuffer_imme + 4 * extbufs.length)
          if (extbufs.length > 0) {
            var extbufids = new Int32Array(HEAPU8.buffer, workertempbuffer_imme, extbufs.length)
            for (var i = 0; i < extbufs.length; ++i) {
              if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
                extbufids[i] = Module['m_re_em_golarraybuf_freeids'].pop()
              } else {
                extbufids[i] = Module['m_re_em_golarraybuf'].length
              }
              Module['m_re_em_golarraybuf'][extbufids[i]] = extbufs[i]
            }
          }
        }
        workerCallbackId_imme = msg.data['callbackId']
        if (data) {
          func(workertempbuffer_imme + 4 * extbufs.length, data.length, workertempbuffer_imme, extbufs.length)
        } else {
          func(0, 0, 0, 0)
        }
      } else {
        if (data) {
          if (!data.byteLength) data = new Uint8Array(data)
          if (!workertempbuffer || workertempbuffersize < 4 * extbufs.length + data.length) {
            if (workertempbuffer) _free(workertempbuffer)
            workertempbuffersize = 4 * extbufs.length + data.length
            workertempbuffer = _malloc(workertempbuffersize)
          }
          HEAPU8.set(data, workertempbuffer + 4 * extbufs.length)
          if (extbufs.length > 0) {
            var extbufids = new Int32Array(HEAPU8.buffer, workertempbuffer, extbufs.length)
            for (var i = 0; i < extbufs.length; ++i) {
              if (Module['m_re_em_golarraybuf_freeids'].length > 0) {
                extbufids[i] = Module['m_re_em_golarraybuf_freeids'].pop()
              } else {
                extbufids[i] = Module['m_re_em_golarraybuf'].length
              }
              Module['m_re_em_golarraybuf'][extbufids[i]] = extbufs[i]
            }
          }
        }
        workerResponded = false
        workerCallbackId = msg.data['callbackId']
        if (data) {
          func(workertempbuffer + 4 * extbufs.length, data.length, workertempbuffer, extbufs.length)
        } else {
          func(0, 0, 0, 0)
        }
      }
    }
    function procworkertaskbuffer() {
      if (workertaskbuffer.length <= 0 || workerResponded == false || workerenable <= 0) {
        return
      }
      var curmsg = workertaskbuffer.shift()
      procworkertask(curmsg)
    }
    ;(function () {
      var messageBuffer = null
      function flushMessages() {
        if (!messageBuffer) return
        if (runtimeInitialized) {
          var temp = messageBuffer
          messageBuffer = null
          temp.forEach(function (message) {
            onmessage(message)
          })
        }
      }
      function messageResender() {
        flushMessages()
        if (messageBuffer) {
          setTimeout(messageResender, 100)
        }
      }
      onmessage = (msg) => {
        if (!runtimeInitialized) {
          if (!messageBuffer) {
            messageBuffer = []
            setTimeout(messageResender, 100)
          }
          messageBuffer.push(msg)
          return
        }
        flushMessages()
        if (msg.data['type'] == 0) {
          workertaskbuffer.push(msg)
          if (workerResponded && workertaskbuffer.length <= 1 && workerenable > 0) {
            setTimeout(procworkertaskbuffer, 1)
          }
        } else if (msg.data['type'] == 1) {
          workerimmeproc = 1
          procworkertask(msg)
          workerimmeproc = 0
        } else if (msg.data['type'] == 2) {
          workerenable = msg.data['enable']
          if (workerenable >= 100) {
            console.log(
              'workerResponded[' +
                workerResponded +
                '] workerenable[' +
                workerenable +
                '] workertaskbuffer.length[' +
                workertaskbuffer.length +
                ']'
            )
          } else if (workerenable < 0) {
            workerResponded = true
            workerCallbackId = -1
            workertaskbuffer = []
            workerimmeproc = 0
            workerCallbackId_imme = -1
          }
          if (workerResponded && workerenable > 0 && workertaskbuffer.length > 0) {
            setTimeout(procworkertaskbuffer, 1)
          }
        }
      }
    })()

    return CreateModuleRE2.ready
  }
})()
if (typeof exports === 'object' && typeof module === 'object') module.exports = CreateModuleRE2
else if (typeof define === 'function' && define['amd'])
  define([], function () {
    return CreateModuleRE2
  })
else if (typeof exports === 'object') exports['CreateModuleRE2'] = CreateModuleRE2
