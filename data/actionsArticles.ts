import { BlogPost } from "./blog/types";
import { articlesPart01 } from "./articles/part01";
import { articlesPart02 } from "./articles/part02";
import { articlesPart03 } from "./articles/part03";
import { articlesPart04 } from "./articles/part04";
import { articlesPart05 } from "./articles/part05";
import { articlesPart06 } from "./articles/part06";

export const actionScheduledArticles: BlogPost[] = [
  ...articlesPart01,
  ...articlesPart02,
  ...articlesPart03,
  ...articlesPart04,
  ...articlesPart05,
  ...articlesPart06,
];
