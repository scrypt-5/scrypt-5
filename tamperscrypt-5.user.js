// ==UserScript==
// @name         Scrypt-5
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds a badge icon to specific twitter accounts
// @author       Scrypt-5
// @match        https://twitter.com/*
// @grant        GM_xmlhttpRequest
// Influenced by https://greasyfork.org/ru/scripts/35054-proven
// ==/UserScript==

(function() {
    'use strict';

  const icons = {
    ukr1: 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIAAoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////////wHN+O4B0PvuAM757gC96e4Go8fuQo2U7ieRo+4AsNjuAMfz7gDQ++4Bz/nuAc347v///////////////wHa//8A1f//AM39/xKz1f9UjY3/szoA/7M6AP+zOgD/amVd/zOXq/8Ewur/ANP//wHV//8B2f////////////8B1v//BMn0/16Xlf+lYC7/szoA/7M6AP9CbnD/YEg1/7M6AP+MLQv/eltN/zCtxv8A0P3/AdX///////8BzvjuANn//0axv/+/SgD/szoA/7M6AP9aT0P/FLrZ/yeftP+zOgD/szoA/7M6AP+IUzv/EM31/wDX//8BzvjuAc747gDc//9gnpn/szoA/7M6AP9DcnX/Jp+0/yuZq/8jpLv/MpCc/0hydf+zOgD/szoA/yDE5f8A2P//Ac347gHO+O4A3P//XqGe/7M6AP9FkpD/VFdL/yegs/8fqcL/G6/K/z97f/9FdHL/VVhL/7M6AP8exuj/ANj//wHN+O4BzvjuAN3//16jov+zOgD/ToqD/ziCjf8umqb/RXZ4/zOQnf89goj/L5ak/1xPP/+zOgD/Hsjr/wDY//8BzfjuANX97gDj//9aqKn/szoA/0uQi/8io7z/Y04+/yuhtP9KcG//U2Rd/x2zzf9fTjz/szoA/xjP9v8A3f//ANX97hq50O4axdf/a5uR/7M6AP9Uf3P/SWdl/7M6AP83iJL/VF9X/7M6AP9PZmD/WFRG/7M6AP81ucz/G8DW/xq50O6jRgPuqEgB/69jKv+zOgD/VIB0/0Nwcf+zOgD/Tmhj/2dELv+zOgD/RnNy/1ZVSP+zOgD/qlkc/6lHAP+jRgPuqEYB7qtHAP+xYij/szoA/1V+cf8uhpb/szoA/1eCdP9nQCr/szoA/zSKlf9ZUEH/ji4L/61YGv+sRgD/qEYB7qZHBO6pSQH/sGMq/7M6AP84oKb/Lp6t/7M6AP9InJf/WUs+/7M6AP8Rw+X/VE9E/548C/+uXB3/qUcA/6ZHBO6mRwTuqUkB/7BjKv+zOgD/ZX9n/5FcJf+5OwD/N6Sr/1ZfVf+yMgD/cHla/3RYNf+zVRL/rVsd/6lHAP+mRwTu/////6lJAf+wZCr/szoA/7BEAP+uRgD/r0YB/4FqP/+WWB//r0kB/7FDAP+sRgD/rloc/65aHf+pRwD///////////+sSwH/r2Mq/6JKCf+cRQT/l0MF/7M6AP+zOgD/szoA/7M6AP+ZRAX/nUMB/6lYG/+tWhz/rUkA/////////////////6lXHO6nXCPup2Ir7qhmNu6nbULuqHFI7qhxRu6naz7up2M17qdeJ+6oXCLuqFQW7v//////////',
    ukr2: 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIAAoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgm7jcIaHA7SCcuu0gmLvtH5y67RiYuu0ZnLvt7efp/+3n6f8WmLvtHpi67R+Yuu0fmLrtIZy77SGhwO0gmrjcH5q28yWmxv8foMD/Fp7A/xKewP8hoMD/7efp/+3n6f/t5+n/7efp/w+dwP8Vnr//GZ7A/ySgwf8mpsf/H5q28yGXte0foMD/MZ66/1Wluf9TpLj/7efp/xaewP/t5+n/7efp/xaewP/t5+n/VqW4/0SiuP8hm7v/I6DB/yGWtO0flrTtFp7A/1KluP/t5+n/j661/+3n6f/t5+n/7efp/+3n6f/t5+n/7efp/xaewP/t5+n/GZq6/yCgwP8flrTtHpa07RaewP9Wpbj/7efp/wSXuf/t5+n/Fp7A/+3n6f/t5+n/Fp7A/+3n6f8WnsD/7efp/xmauv8goMD/H5a07R+WtO0VnsD/U6W4/+3n6f9uqbb/c6q2/+3n6f8WnsD/Fp7A/+3n6f8WnsD/Fp7A/+3n6f8Zmrr/IKDA/x6XtO0dmLztE6HG/0ylvP/t5+n/pra7/zihuv8WnsD/7efp/+3n6f8WnsD/gK+8/7q4uf/t5+n/Fpy//xyixv8ZnLztJ5Sr7SKbs/9cpbL/7efp/zWRof+Tqaz/7efp/+3n6f/t5+n/7efp/2SgqP9SnKn/7efp/ySYr/8pnbT/JpSs7ZNnGO2YZhH/ooZU/+3n6f+KXRD/raCJ/+3n6f/t5+n/7efp/+3n6f+ScTH/nX9K/+3n6f+UZRT/m2sa/5NnGO2dXwrto2EC/6iDS//t5+n/pHAm/+3n6f+kcyv/7efp/+3n6f+qiln/7efp/6Z6Ov/t5+n/n2AF/6ZmDP+eXwrtl2AQ7Z9iBv+lg0z/7efp/6F1Mv/t5+n/nmgW/+3n6f/t5+n/nWcV/+3n6f+jfEL/7efp/5thCf+iZxD/lmAQ7ZZkEO2gYgb/poJM/+3n6f+smn7/7efp/51nFP/t5+n/7efp/5peA//t5+n/qI5n/+3n6f+bYQn/oWcR/5dgEO2XYBDtoGIG/6R+RP/t5+n/7efp/51nFf+fax7/7efp/+3n6f+aWgL/pYRP/+3n6f/t5+n/m2EK/6JnEP+WYBDtlmAR7aBiBv+mhVH/7efp/5xnFP+aXgP/oG4k/+3n6f/t5+n/ml0E/5lcAP+qkWv/7efp/5xiC/+iZxH/l2AR7ZthDvOnahD/pXMp/6l+Pv+gZAn/oGUL/6RuHf/t5+n/7efp/6BiBv+gZQz/o28f/6qAQv+hZw//qG0T/5thD/OWYxPcoGcS7ZZeCe2UXQXtlmQQ7ZdgEO2WXgrtoHYx7Z1pHe2XXw/tl2AR7ZZeCe2UXQXtl2QR7Z9mEu2WYxPc',
  };

  const users = new Map();
  const getUser = (username) => {
    if (!users.has(username)) {
      users.set(
        username,
        Promise.resolve([])
      );
    }
    return users.get(username);
  };

  const getProfileInfo = () => {
    const element = document.querySelector('.ProfileHeaderCard-screenname:not(.ukrchecked)');
    if (!element) return;
    const user = element.querySelector('b').innerText;
    element.classList.add('ukrchecked');
    getUser(user)
      .then((proofs) => proofs.map(({proof_type, nametag, service_url}) => {
        if (proof_type === 'twitter') return;
        element.innerHTML +=`
        <br/>
        <a href="${service_url}" class="ProfileHeaderCard-screennameLink u-linkComplex js-nav">
        <b><img src="${icons[proof_type]}"/> ${nametag}</b>
        </a>
        `;
      }));
  };
  const getTweetInfo = () => {
    Array.from(document.querySelectorAll('.tweet .account-group:not(.ukrchecked)'))
      .map(parent => {
        parent.classList.add('ukrchecked');
        const user = parent.querySelector('.username b').innerText;
        const element = parent.querySelector('.UserBadges');
        getUser(user)
          .then((proofs) => proofs.map(({proof_type, nametag, service_url}) => {
            console.log("Checked user", user);
            if (proof_type === 'twitter') return;
            element.innerHTML +=`
            <a href="${service_url}" title="${nametag}"><img src="${icons[proof_type]}"/></a>
            `;
          }));
      });
  };

  const fetchUsers = () => {
      new Promise((resolve, reject) => GM_xmlhttpRequest({
          method: 'GET',
          url: `https://scrypt-5.github.io/scrypt-5/names.json`,
          onload: resolve,
          onerror: reject,
        }))
          .then(({response}) => JSON.parse(response))
          .then((list) => {
                list.map(({id, tag, url}) => {
                    users.set(id, Promise.resolve([{proof_type: "ukr2", nametag: tag, service_url: url}]));
                });
          window.setInterval(getProfileInfo, 1000);
          window.setInterval(getTweetInfo, 1000);
      });
  };
  fetchUsers();

})();
