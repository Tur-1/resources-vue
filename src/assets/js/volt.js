"use strict";
const d = document;
d.addEventListener("DOMContentLoaded", function (event)
{


    // options
    const breakpoints = {
        sm: 540,
        md: 720,
        lg: 960,
        xl: 1140
    };

    var sidebar = document.getElementById('sidebarMenu')
    if (sidebar && d.body.clientWidth < breakpoints.lg)
    {
        sidebar.addEventListener('shown.bs.collapse', function ()
        {
            document.querySelector('body').style.position = 'fixed';
        });
        sidebar.addEventListener('hidden.bs.collapse', function ()
        {
            document.querySelector('body').style.position = 'relative';
        });
    }

    var iconNotifications = d.querySelector('.notification-bell');
    if (iconNotifications)
    {
        iconNotifications.addEventListener('shown.bs.dropdown', function ()
        {
            iconNotifications.classList.remove('unread');
        });
    }

});