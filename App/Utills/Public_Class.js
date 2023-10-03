class DateUtil {

  getCurrentUTCDate(){
    return new Date(Date.now() + new Date().getTimezoneOffset() * 60 * 1000); // Convert to UTC timezone
  }
 
  getUTCStartOfDay(){
    const now = this.getCurrentUTCDate();
    return new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        0,
        0,
        0,
        0
      )
    );
  }
 
  getUTCEndOfDay(){
    const now = this.getCurrentUTCDate();
    return new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        23,
        59,
        59,
        999
      )
    );
  }
};

 module.exports = {
  DateUtil: new DateUtil(),
 }