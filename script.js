function minutes_with_leading_zeros(dt) {
    return (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
}

function stringToDateTimeObject(string, boolean) {
    let dateObject = new Date();
    let splittedString = string.split(' ');
    let count = 0;
    let splitTimeString;
    if (splittedString.length > 1) {
        splitTimeString = splittedString[2].split(':')
    } else {
        splitTimeString = string.split(':');
    }
    if (splittedString[0] === 'morgen') {
        dateObject.setDate(dateObject.getDate()+1)
    }
    dateObject.setHours(splitTimeString[0]);
    dateObject.setMinutes(splitTimeString[1]);
    dateObject.setSeconds(splitTimeString[2]);
    if (boolean === false) {
        dateObject.setMilliseconds(0);
    } else {
        dateObject.setMilliseconds(splitTimeString[3]);
    }
    return dateObject;
}

function calculateRetreatTime(troepen_aankomst, troepen_aankomst_snipe) {
    if (troepen_aankomst.getDate() !== troepen_aankomst_snipe.getDate()) {
        troepen_aankomst_snipe.setDate(troepen_aankomst_snipe.getDate())
    }
    troepen_aankomst_snipe.setHours(troepen_aankomst_snipe.getHours() - troepen_aankomst.getHours());
    troepen_aankomst_snipe.setMinutes(troepen_aankomst_snipe.getMinutes() - troepen_aankomst.getMinutes());
    troepen_aankomst_snipe.setSeconds(troepen_aankomst_snipe.getSeconds() - troepen_aankomst.getSeconds());
    troepen_aankomst_snipe.setMilliseconds(troepen_aankomst_snipe.getMilliseconds() - troepen_aankomst.getMilliseconds() + 50);
    return troepen_aankomst_snipe
}

function calculateAttackTimeWithOffset(troepen_aankomst, troepen_aankomst_snipe) {
    if (troepen_aankomst.getDate() !== troepen_aankomst_snipe.getDate()) {
        troepen_aankomst_snipe.setDate(troepen_aankomst_snipe.getDate())
    }
    troepen_aankomst_snipe.setHours(troepen_aankomst_snipe.getHours() - troepen_aankomst.getHours());
    troepen_aankomst_snipe.setMinutes(troepen_aankomst_snipe.getMinutes() + 2 - troepen_aankomst.getMinutes());
    troepen_aankomst_snipe.setSeconds(troepen_aankomst_snipe.getSeconds() - troepen_aankomst.getSeconds());
    troepen_aankomst_snipe.setMilliseconds(troepen_aankomst_snipe.getMilliseconds() - troepen_aankomst.getMilliseconds() + 25);
    return troepen_aankomst_snipe
}

$(document).ready(function () {
    $('#verdedigende_snipe_checkbox').change(function () {
        if (this.checked) {
            $('#verdedigende_snipe_fields').toggle();
            $('#aanvallende_snipe_fields').toggle();
        } else {
            $('#verdedigende_snipe_fields').toggle();
            $('#aanvallende_snipe_fields').toggle();
        }

    });

    $('#snipe_calculator_form').on('submit', function (e) {
        e.preventDefault();
        let troepen_aankomst = stringToDateTimeObject($('#aankomst_dorp').val(), false);
        let troepen_aankomst_snipe = stringToDateTimeObject($('#troepen_aankomst_snipe').val(), true);
        let aanvals_tijd = $('#aanvals_tijd');
        let aanvals_tijd_calculated;
        if ($('#verdedigende_snipe_checkbox').prop('checked')) {
            let terugtrek_tijd = calculateRetreatTime(troepen_aankomst, troepen_aankomst_snipe);
            $('#terugtrek_tijd').html(
                terugtrek_tijd.getDate() +
                '-' + (terugtrek_tijd.getMonth() + 1) +
                '-' + terugtrek_tijd.getFullYear() +
                ' ' + terugtrek_tijd.getHours() +
                ':' + minutes_with_leading_zeros(terugtrek_tijd) +
                ':' + terugtrek_tijd.getSeconds() +
                ':' + terugtrek_tijd.getMilliseconds());
            aanvals_tijd_calculated = calculateAttackTimeWithOffset(troepen_aankomst, troepen_aankomst_snipe);
        } else {
            aanvals_tijd_calculated = calculateRetreatTime(troepen_aankomst, troepen_aankomst_snipe);
        }
        aanvals_tijd.html(aanvals_tijd_calculated.getDate() +
            '-' + (aanvals_tijd_calculated.getMonth() + 1) +
            '-' + aanvals_tijd_calculated.getFullYear() +
            ' ' + aanvals_tijd_calculated.getHours() +
            ':' + minutes_with_leading_zeros(aanvals_tijd_calculated) +
            ':' + aanvals_tijd_calculated.getSeconds() +
            ':' + aanvals_tijd_calculated.getMilliseconds());
    });
});