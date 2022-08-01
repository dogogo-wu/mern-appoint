const convertToDateTime = (isoStr) => {
    const d = new Date(isoStr);
    const datetime = d.toLocaleString();
    return datetime.substring(0, datetime.length - 3);
  };
  
  const durationCalc = (t1, t2) => {
    const a = new Date(t1);
    const b = new Date(t2);
    const diff = b - a;
  
    var tmp = diff / 1000 / 60 / 60 / 24;
    const days = Math.floor(tmp);
    tmp = (tmp - days) * 24;
    const hours = Math.floor(tmp);
    tmp = (tmp - hours) * 60;
    const mins = Math.round(tmp);
  
    const result = days + "天" + hours + "小時" + mins + "分鐘";
    return result;
  };

  export default {convertToDateTime, durationCalc}