type FalseType = false | null | undefined | "" | 0;
type JoinClassNameType =
  | Record<string, FalseType>
  | (string | FalseType)[]
  | string
  | FalseType;

export default function joinClassNames(...classNames: JoinClassNameType[]) {
  const finalClassnameArr = classNames.reduce(
    (pre: string[], cur): string[] => {
      if (!cur) {
        return pre;
      }
      if (typeof cur === "string") {
        cur && pre.push(cur);
        return pre;
      }
      if (Array.isArray(cur)) {
        for (const ele of cur) {
          ele && pre.push(ele);
        }
        return pre;
      }

      for (const [key, val] of Object.entries(cur)) {
        val && pre.push(key);
      }
      return pre;
    },
    []
  );

  return finalClassnameArr.join(" ");
}
