export default function joinClassname(
  ...classnames: (Record<string, boolean> | string | false)[]
) {
  const finalClassnameArr = classnames.reduce((pre, cur) => {
    if (typeof cur === "string") {
      cur && pre.push(cur);
      return pre;
    }

    for (const [key, val] of Object.entries(cur)) {
      val && pre.push(key);
    }
    return pre;
  }, [] as string[]);

  return finalClassnameArr.join(" ");
}
