/* Helper Function Library for UI */

export function formatDate(date_string) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    var d = new Date(date_string)
    let formattedDate = monthNames[d.getMonth()] + " " + d.getDate();

    return formattedDate;
}

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }