const moment = require("moment-jalali");

module.exports = class DateUtil {
  #DATE;
  constructor(DATE){
    this.#DATE = DATE;
  }
  getCurrentDate(){
    const moment = require("moment-jalali");
    return moment(this.#DATE, "jYYYY/jMM/jDD").format("jYYYY/jMM/jDD");
  }
 
  getStartOfDay(){
    const now = this.getCurrentDate();
    return (
      now + " " + 0+":"+0+":"+0+":"+0
    )
      
  }
 
  getEndOfDay(){
    const now = this.getCurrentDate();
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

//  const start = new DateUtil(start_date).getStartOfDay();

// class DateUtil {
//   getCurrentUTCDate(){
//     return new Date(Date.now() + new Date().getTimezoneOffset() * 60 * 1000); // Convert to UTC timezone
//   }
 
//   getUTCStartOfDay(){
//     const now = this.getCurrentUTCDate();
//     return new Date(
//       Date.UTC(
//         now.getUTCFullYear(),
//         now.getUTCMonth(),
//         now.getUTCDate(),
//         0,
//         0,
//         0,
//         0
//       )
//     );
//   }
 
//   getUTCEndOfDay(){
//     const now = this.getCurrentUTCDate();
//     return new Date(
//       Date.UTC(
//         now.getUTCFullYear(),
//         now.getUTCMonth(),
//         now.getUTCDate(),
//         23,
//         59,
//         59,
//         999
//       )
//     );
//   }
// };

//  module.exports = {
//   DateUtil: new DateUtil(),
//  }
 // const start_date = Date.now();
      // const endTime = (start_date + (end_date * 60 * 60 * 1000)); 
      // const convertTime = getTime(endTime);
      // const start_date = DateUtil.getUTCStartOfDay();
      // const convertTime = DateUtil.getUTCEndOfDay();