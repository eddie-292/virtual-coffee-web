
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

// 动态宽高传入
export function getIcon (icon, width = 32, height = 32, fontSize = 32) {

    // 勤劳
    if (icon === 'bee') {
        //width: ${width}px;height: ${height}px;
        return `<div style="font-size: ${fontSize}px;">🐝</div>`
    }

    // 和平
    if (icon === 'peace') {
        return `<div style="font-size: ${fontSize}px;">🕊</div>`
    }

    // 纯洁
    if (icon === 'pure') {
        return `<div style="font-size: ${fontSize}px;">🦢</div>`
    }

    // 洞察力
    if (icon === 'insight') {
        return `<div style="font-size: ${fontSize}px;">👁️</div>`
    }

    // 专注
    if (icon === 'focus') {
        return `<div style="font-size: ${fontSize}px;">🧘</div>`
    }

    // 灵活
    if (icon === 'flexible') {
        return `<div style="font-size: ${fontSize}px;">🐙</div>`
    }

    // 速度
    if (icon === 'speed') {
        return `<div style="font-size: ${fontSize}px;">🚀</div>`
    }

    // 天使
    if (icon === 'angel') {
        return `<div style="font-size: ${fontSize}px;">👼</div>`
    }

}