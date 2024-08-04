// ==UserScript==
// @name         Filmbol Link Grabber
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Sayfadaki down-buttons elementlerinin href değerlerini toplayıp kopyalama imkanı sunar.
// @author       rakpunar
// @match        https://forum.filmbol.org/*
// @icon         https://forum.filmbol.org/logo.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Sayfa tamamen yüklendikten sonra çalışır
    window.addEventListener('load', function() {
        // down-buttons elementlerini bulma
        var downButtons = document.getElementsByClassName('down-buttons');
        // down-buttons elementleri yoksa div oluşturulmayacak
        if (downButtons.length === 0) {
            return;
        }

        // Div oluşturma
        var div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.top = '10px';
        div.style.right = '10px';
        div.style.backgroundColor = '#1D2333';
        div.style.border = '1px solid #ccc';
        div.style.padding = '10px';
        div.style.zIndex = '1000';
        div.style.width = '600px';

        // Textarea oluşturma
        var textarea = document.createElement('textarea');
        textarea.rows = downButtons.length;
        textarea.style.width = '100%';
        textarea.style.height = '150px';
        textarea.readOnly = true;
        div.appendChild(textarea);

        // Kopyala butonu oluşturma
        var copyButton = document.createElement('button');
        copyButton.className = 'direktlink';
        copyButton.innerText = 'Kopyala';
        copyButton.style.marginTop = '10px';
        copyButton.onclick = function() {
            textarea.select();
            document.execCommand('copy');
            copyButton.innerText = 'Bağlantılar kopyalandı!';
            copyButton.style.backgroundColor = '#4CAF50';
            copyButton.style.color = '#fff';
            setTimeout(function() {
                copyButton.innerText = 'Kopyala';
                copyButton.style.backgroundColor = '';
                copyButton.style.color = '';
            }, 1000);
        };
        div.appendChild(copyButton);
        // Sayfaya div ekleme
        document.body.appendChild(div);
        // down-buttons elementlerinin href değerlerini textarea'ya yazma
        textarea.value = Array.from(downButtons).map((button) => {
            return button.href;
        }).join('\n');
    });
})();
