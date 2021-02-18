import { AdminTaskBar } from '../views/admin-task-bar/admin-task-bar.js';
import { AdminHome } from '../views/admin-main-container/admin-main-container.js';
import { AdminUsers } from '../views/admin-users/admin-users.js';
import { AdminReports } from '../views/admin-reports/admin-reports.js';
import { AdminSetupCompany } from '../views/admin-setup-company/admin-setup-company.js';
import { TaskBar } from '../views/task-bar/task-bar.js';
import { MainContainer } from '../views/main-container/main-container.js';
import { EmailContainer } from '../views/email/email.js';
import { DispatchContainer } from '../views/dispatch/dispatch.js';
import { CustomerContainer } from '../views/customer/customer.js';
import { CarrierContainer } from '../views/carrier/carrier.js';
import { LoadBoardContainer } from '../views/load-board/load-board.js';
import { InvoiceContainer } from '../views/invoicing/invoicing.js';

var adminTaskBar = new AdminTaskBar();
var adminHome = new AdminHome();
var adminUsers = new AdminUsers();
var adminReports = new AdminReports();
var adminSetupCompany = new AdminSetupCompany();
var taskBar = new TaskBar();
var mainContainer = new MainContainer();
var email = new EmailContainer();
var dispatch = new DispatchContainer();
var customer = new CustomerContainer();
var carrier = new CarrierContainer();
var loadBoard = new LoadBoardContainer();
var invoice = new InvoiceContainer();
var winRes = $(this).width();
var swiper;
var adminSwiper;

$(document).ready(function () {
    // Adding dynamically the task bar and the main container
    taskBar.create(swiper, email, dispatch, customer, carrier, loadBoard, invoice, function () {
        mainContainer.create();
    });

    adminTaskBar.create(adminSwiper, adminUsers, adminReports, adminSetupCompany, function () {
        adminHome.create();
    });

    $(window).on('resize', function () {
        winRes = $(this).width();
    });

    if (!localStorage.getItem('tempAdminUsers')) {
        let users = [];
        let stateList = [
            'AL',
            'AK',
            'AZ',
            'AR',
            'CA',
            'CO',
            'CT',
            'DE',
            'DC',
            'FL',
            'GA',
            'HI',
            'ID',
            'IL',
            'IN',
            'IA',
            'KS',
            'KY',
            'LA',
            'ME',
            'MD',
            'MA',
            'MI',
            'MN',
            'MS',
            'MO',
            'MT',
            'NE',
            'NV',
            'NH',
            'NJ',
            'NM',
            'NY',
            'NC',
            'ND',
            'OH',
            'OK',
            'OR',
            'PA',
            'RI',
            'SC',
            'SD',
            'TN',
            'TX',
            'UT',
            'VT',
            'VA',
            'WA',
            'WV',
            'WI',
            'WY'
        ];
        let statusList = [
            'Active',
            'Inactive'
        ]

        for (let i = 1; i <= 20; i++) {
            let user = {
                id: i,
                name: 'Name ' + i,
                email: 'E-mail ' + i,
                phone: 'Phone Number ' + i,
                address: 'Address ' + i,
                city: 'City ' + i,
                state: stateList[Math.floor(Math.random()*stateList.length)],
                zipCode: pad(i, 5),
                status: statusList[Math.floor(Math.random()*statusList.length)]
            }

            users.push(user);
        }

        localStorage.setItem('tempAdminUsers', JSON.stringify(users));
    }
});

function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

async function countApp(callback) {
    let len = $(document).find('.swiper-wrapper .swiper-slide').length;
    if (len > 1) {
        await $(document).find('.app-counter').text(len - 1).removeClass('hidden');
    } else {
        await $(document).find('.app-counter').text(0).addClass('hidden');
    }
    callback();
}

function setPanelDraggable() {
    $('.panel')
        .draggable({
            axis: 'x',
            handle: '.drag-handler',
            stop: function (e, u) {
                let mainPanelContainer = $(this).closest('.main-panel-container');
                let panelContainer = $(this).closest('.panel-container');
                let winSize = $(window).width();

                if (u.position.left < 0) {
                    reorderDispatchPanels();
                } else if (u.position.left > 100) {
                    $(this).animate({
                        left: '100%'
                    }, 100, async function () {
                        await $(this).remove();
                        if (panelContainer.find('.panel').length === 0) {
                            mainPanelContainer.css('left', '100%');
                        } else {
                            reorderDispatchPanels();
                        }
                    });
                } else {
                    reorderDispatchPanels();
                }
            }
        });
}