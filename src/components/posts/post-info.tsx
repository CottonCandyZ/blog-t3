import dayjs from "dayjs";
import { Fragment } from "react";
import {
  IcOutlineCalendarTodayReact,
  MaterialSymbolsTagRounded,
} from "~/components/icons";

const PostInfo: React.FC<{ date: string; tags: string[] | undefined }> = ({
  date,
  tags,
}) => {
  return (
    <div className="mt-4 flex flex-row flex-wrap items-center gap-3">
      <div className="flex flex-row items-center gap-2">
        <div className="rounded-lg bg-primary-light/60 p-1.5 text-primary-small">
          <IcOutlineCalendarTodayReact className="size-5" />
        </div>
        <h2 className="min-w-max font-semibold text-primary-small">
          <time dateTime={date} suppressHydrationWarning>
            {dayjs(date).format("YYYY-MM-DD")}
          </time>
        </h2>
      </div>
      {tags && (
        <div className="flex flex-row items-center gap-2">
          <div className="rounded-lg bg-primary-light/60 p-1.5 text-primary-small">
            <MaterialSymbolsTagRounded className="size-5" />
          </div>
          <div className="flex min-w-max flex-row gap-1 font-semibold text-primary-small">
            {tags.map((item, index) => (
              <Fragment key={index}>
                <span>{item}</span>
                <span>{index != tags.length - 1 ? "/" : ""}</span>
              </Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostInfo;
