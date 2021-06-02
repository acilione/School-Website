function testRegex(regex_expr, string) {
    const str = string;
    const regex = new RegExp(regex_expr, 'i');
    return(regex.test(str));
}

function cfValid(string)
{
    const regex_expr = "^(?:[A-Z][AEIOU][AEIOUX]|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$";
    return (testRegex(regex_expr, string));
}

function nameValid(string)
{
    const regex_expr = "^[a-zA-Z]+$";
    return (testRegex(regex_expr, string) && string.length < 30);
}

function surnameValid(string)
{
    const regex_expr = "^[a-zA-Z]+$";
    return (testRegex(regex_expr, string) && string.length < 30);
}

function emailValid(string)
{
    const regex_expr = "^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,3}))$";
    return (testRegex(regex_expr, string));
}   

function dateValid(string)
{
    const regex_expr = "^[1-2][0-9][0-9][0-9]-([0][0-9]|[1][0-2])-[0-3][0-9]$" 
    return (testRegex(regex_expr, string));
}
function passwordValid(string)
{
    const regex_expr = "^[a-zA-Z0-9]{8}$";
    const regex = new RegExp(regex_expr);
    return (regex.test(string));
}
function fieldEmpty(field)
{
    field = field.trim();
    return (field.length === 0);
}
function sexValid(field)
{
    return (field === "M" || field === "F");
}

//function hasPHPExtension(string)
//{
//    const regex_expr = "^.+[.]php$";
//    return testRegex(regex_expr, string);
//}