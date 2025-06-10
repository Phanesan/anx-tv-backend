export function Validate(account: any): any[] {
    let errors: any[] = [];

    if (Array.isArray(account)) {
        for (const errorCode of account) {
            switch (errorCode) {
                case 0:
                    errors.push({ code: errorCode, message: "Email is required" });
                    break;
                case 1:
                    errors.push({ code: errorCode, message: "Password is required" });
                    break;
            }
        }
    }

    return errors;
}