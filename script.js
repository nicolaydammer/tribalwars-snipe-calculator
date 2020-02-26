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
        let troepen_aankomst = $('#aankomst_dorp');
        let troepen_aankomst_snipe = $('#troepen_aankomst_snipe');
        let aanvals_tijd = $('#aanvals_tijd');

        if ($('#verdedigende_snipe_checkbox:checked')) {
            let terugtrek_tijd = $('#terugtrek_tijd');
            //todo: calculate defending time
        }else {
            //todo: calculate attacking time
        }
    });
});

