/**
 * Created by john on 2016/4/9.
 */
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
2	// Use of this source code is governed by a BSD-style license that can be
3	// found in the LICENSE file.
4
5	/*
 6	  Displays a notification with the current time. Requires "notifications"
 7	  permission in the manifest file (or calling
 8	  "Notification.requestPermission" beforehand).
 9	*/
/*function show() {
    var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
    var hour = time[1] % 12 || 12;               // The prettyprinted hour.
    var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
    new Notification(hour + time[2] + ' ' + period, {
        icon: './images/apple_48.png',
        body: 'Time to make the toast.'
    });
}

// Conditionally initialize the options.
if (!localStorage.isInitialized) {
    localStorage.isActivated = true;   // The display activation.
    localStorage.frequency = 1;        // The display frequency, in minutes.
    localStorage.isInitialized = true; // The option initialization.
}

// Test for notification support.
if (window.Notification) {
    // While activated, show notifications at the display frequency.
    if (JSON.parse(localStorage.isActivated)) {
        show();
    }

    var interval = 0; // The display interval, in minutes.

    setInterval(function () {
        interval++;

        if (
            JSON.parse(localStorage.isActivated) &&
            localStorage.frequency <= interval
        ) {
            show();
            interval = 0;
        }
    }, 60000);
}*/


chrome.browserAction.onClicked.addListener(function (tab) {
    // No tabs or host permissions needed!
    console.log('Turning ' + tab.url + ' red!');
    /*chrome.tabs.executeScript({
        code: 'document.body.style.backgroundColor="red"'
    });*/

    if( confirm("清爽一下？？")){
        chrome.tabs.executeScript(null,{file:"./inject/clean.js"

        });
    }

});