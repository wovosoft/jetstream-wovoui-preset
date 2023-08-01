<?php

namespace App\Helpers;
/**
 * 5.21 STR INDICATOR
 */
final class StrIndicators
{
    //accessor key starts from 1, so technically each indicator should use index + 1
    public static array $indicators = [
        "Customer has an unusual or excessively nervous demeanor",
        "Customer discusses your record-keeping or reporting duties with the apparent intention of avoiding them",
        "Customer threatens an employee in an effort to discourage required record-keeping or reporting",
        "Customer is reluctant to proceed with a transaction after being told it must be recorded",
        "Direct contact is avoided",
        "Customer appears to have a hidden agenda or behaves abnormally, such as turning down the chance to obtain a higher interest rate on a large account balance",
        "Customer who is a public official opens account in the name of a family member who begins making large deposits not consistent with the known source of legitimate family income",
        "Customer who is a student uncharacteristically transacts large sums of money",
        "Agent, attorney or financial advisor acts for another person without proper documentation such as a power of attorney",
        "address is far from your institution, especially if there is no special reason the business is given. Aren‘t there institutions closer to home that could provide the service",
        "Customer furnishes unusual or suspicious identification documents and is unwilling to provide personal data",
        "Customer is unwilling to provide personal background information when opening an account",
        "Customer‘s permanent address is outside the FI‘s service area",
        "Customer asks many questions about how the financial institution disseminates information about the identification of a customer",
        "A business customer is reluctant to reveal details about the business activities or to provide financial statements or documents about a related business entity",
        "Customer opens several accounts in or more names, then makes several cash deposits under the reporting threshold",
        "Customer conducts large cash transactions at different branches on the same day, or orchestrates persons to do so in his/her behalf",
        "Corporate account has deposits and withdrawals primarily in cash than cheques",
        "Customer deposits large numbers of consecutively numbered money orders or round figure amounts",
        "Customer deposits cheques and/or money orders that are not consistent with the intent of the account or nature of business",
        "Funds out of the accounts are not consistent with normal business or personal items of the account holder",
        "Funds deposited are moved quickly out of the account via payment methods inconsistent with the established purpose of the account",
        "A customer‘s financial statement makes representations that do not conform to accounting principles",
        "Customer suddenly pays off a large problem loan with no plausible explanation of source of funds",
        "Customer purchases certificates of deposit and uses them as collateral for a loan",
        "Business customer presents financial statements noticeably different from those of similar businesses",
        "Large business presents financial statements that are not prepared by an accountant",
        "Employee exaggerates the credentials, background or financial ability and resources of a customer in written reports the FI requires",
        "Employee frequently is involved in unresolved exceptions or recurring exceptions on exception reports",
        "Employee lives a lavish lifestyle that could not be supported by his/her salary",
        "Employee frequently overrides internal controls or established approval authority or circumvents policy",
        "A DPS (or whatever) is calling for the periodic payments in large amounts",
        "Lack of concern for significant tax or other penalties assessed when cancelling a deposit"
    ];
}
