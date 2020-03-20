// ==UserScript==
// @name UrlTransformer
// @version 0.2
// @description urlTransformer for link
// @author You
// @match *://*/*
// @grant none
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    if (document.URL.includes("bib.cnrs.fr")) {
        return;
    }

    console.log('urlTransfomer extension launched');

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css.replace(/;/g, ' !important;');
        head.appendChild(style);
    }

    addGlobalStyle(`
    #modalDomain {
        position: fixed;
        right: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: hidden;
        z-index: 1000;
    }
    .modalDomain-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 1rem 1.5rem;
        width: 24rem;
        border: 2px solid black;
    }
    #closeDomain-button {
        float: right;
        width: 1.5rem;
        line-height: 1.5rem;
        text-align: center;
        cursor: pointer;
        border-radius: 0.25rem;
        background-color: lightgray;
    }
    #closeDomain-button:hover {
        background-color: darkgray;
    }
    .buttonDomain {
        color: #fff;
        background-color: #337ab7;
        border-color: #2e6da4;
        -webkit-appearance: button;
    }
`);

    $('body').append(`
<div id="modalDomain">
    <div class="modalDomain-content">
        <span id="closeDomain-button">&times;</span>
        <form id="chooseDomain">
            <label id="label">Domain : </label>
                    <select id="domain" required="required">
                        <option value="insb">insb</option>
                        <option value="inshs">inshs</option>
                        <option value="inc">inc</option>
                        <option value="in2p3">in2p3</option>
                        <option value="inp">inp</option>
                        <option value="insmi">insmi</option>
                        <option value="inee">inee</option>
                        <option value="insu">insu</option>
                        <option value="insis">insis</option>
                        <option value="ins2i">ins2i</option>
                    </select>
           <button class="buttonDomain" type="submit">redirect</button>
       </form>
    </div>
</div>
    `);

    $('#modalDomain').show();

    $('#closeDomain-button').click(function () {
        $('#modalDomain').hide();
    });

    $('#chooseDomain').submit(function (event) {
        window.open(`http://${$('#domain').val()}.bib.cnrs.fr/login?url=${document.URL}`);
    });

})();