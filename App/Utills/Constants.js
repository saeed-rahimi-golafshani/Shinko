module.exports = {
    MOBILE_PATTERN: /^09[0-9]{9}$/,
    EMAIL_PATTERN: /^([a-z]+)([\w\.\_]{3,20})(\@)([a-z]{2,8})\.([a-z]{2,7})$/,
    MONGOID_PATTERN: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
    FILENMAE_ICON_PATTERN: /(\.svg|\.png|\.ico|\.avif|\.jpg)$/,
    FILENMAE_IMAGE_PATTERN: /(\.png|\.jpg|\.jpeg|\.webp|\.gif|\.jfif)$/,
    ACCESS_Token_SECRETKEY: "4425A5AC563964A6DEBE14AEA4AB24C8513513935070B309",
    REFRESH_TOKEN_SECRETKEY: "D17C777EF75B85AD281B42DADEA3730A2B19D6BE7237DA67",
    ROLES: Object.freeze({
        BUYERS: "BUYERS",
        ADMIN: "ADMIN",
        USERS:  "USERS",
        AUTHORS: "AUTHORS",
        CELLERS: "CELLERS",
        EMPLOYE: "EMPLOYE",
    }),
}