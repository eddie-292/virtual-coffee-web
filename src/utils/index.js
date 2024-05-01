/*
 * Copyright Statement and License Information for Virtual Coffee Kafeih.com Community
 *
 * Copyright Owner：Kafeih.com Community and its contributors, since the inception of the project.
 *
 * License Type：All code, documentation, and design works related to the Kafeih.com Community are licensed under the GNU Affero General Public License (AGPL) v3 or any later version.
 *
 * Use and Distribution：You are free to use, copy, modify, and distribute the code, documentation, and design works of the Kafeih.com Community, subject to the following conditions:
 *
 * 1. You must include the original copyright and license notices in all copies distributed or made publicly available.
 * 2. If you modify the code or design, or derive new works from those provided by the community, you must release these modifications or derivative works under the terms of the AGPLv3 license.
 * 3. Important Note: If you use the code or design of this community to provide network services, you must ensure that all users accessing the service through the network can access the corresponding source code.
 *
 * No Warranty：The Kafeih.com Community and its code, documentation, and design works are provided "as is" without any warranty, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.
 *
 * License Acquisition：The complete text of the GNU Affero General Public License (AGPL) v3 can be found on the GNU official website.
 *
 * Please note that the above statement only applies to the Kafeih.com Community and the code, documentation, and design works provided by it. Third-party links or resources may be subject to different licenses from their respective owners or publishers. When using these resources, please be sure to comply with the terms of their respective licenses.
 */

import Cookies from 'js-cookie'
import store from '@/store'

/**
 * 权限
 * @param {*} key
 */
export function hasPermission (key) {
  return window.SITE_CONFIG['permissions'].indexOf(key) !== -1 || false
}

/**
 * 获取字典数据列表
 * @param dictType  字典类型
 */
export function getDictDataList (dictType) {
  const type = window.SITE_CONFIG['dictList'].find((element) => (element.dictType === dictType))
  if (type) {
    return type.dataList
  } else {
    return []
  }
}

/**
 * 获取字典名称
 * @param dictType  字典类型
 * @param dictValue  字典值
 */
export function getDictLabel (dictType, dictValue) {
  const type = window.SITE_CONFIG['dictList'].find((element) => (element.dictType === dictType))
  if (type) {
    const val = type.dataList.find((element) => (element.dictValue === dictValue + ''))
    if (val) {
      return val.dictLabel
    } else {
      return dictValue
    }
  } else {
    return dictValue
  }
}

/**
 * 清除登录信息
 */
export function clearLoginInfo () {
  console.log("clearLoginInfo")
  store.commit('resetStore')
  Cookies.remove('token')
}

/**
 * 获取uuid
 */
export function getUUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}

/**
 * 获取svg图标(id)列表
 */
export function getIconList () {
  var res = []
  var list = document.querySelectorAll('svg symbol')
  for (var i = 0; i < list.length; i++) {
    res.push(list[i].id)
  }

  return res
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate (data, id = 'id', pid = 'pid') {
  var res = []
  var temp = {}
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
  }
  for (var k = 0; k < data.length; k++) {
    if (!temp[data[k][pid]] || data[k][id] === data[k][pid]) {
      res.push(data[k])
      continue
    }
    if (!temp[data[k][pid]]['children']) {
      temp[data[k][pid]]['children'] = []
    }
    temp[data[k][pid]]['children'].push(data[k])
    data[k]['_level'] = (temp[data[k][pid]]._level || 0) + 1
  }
  return res
}
