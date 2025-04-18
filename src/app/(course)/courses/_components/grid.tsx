import Link from "next/link";
import { type SearchParams, stringifySearchParams } from "@/lib/url-state";
import { type Courses } from "@/server/db/schema";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export async function CoursesGrid({
  courses,
  searchParams,
}: {
  courses: Courses[];
  searchParams: SearchParams;
}) {
  return (
    <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {!courses?.length ? (
        <p className="text-muted-foreground col-span-full text-center">
          No courses found.
        </p>
      ) : (
        courses.map((course, index) => (
          <CourseLink
            key={course.id}
            course={course}
            priority={index < 10}
            searchParams={searchParams}
          />
        ))
      )}
    </div>
  );
}

function CourseLink({
  course,
  searchParams,
}: {
  priority: boolean;
  course: Courses;
  searchParams: SearchParams;
}) {
  return (
    <Link
      href={`/course/${course.id}?${stringifySearchParams(searchParams)}`}
      className="block h-full transition ease-in-out md:hover:scale-105"
      prefetch={true}
    >
      <Card className="flex h-full flex-col overflow-hidden">
        <div className="bg-primary/5 flex aspect-video items-center justify-center">
          <BookOpen className="text-muted-foreground h-10 w-10" />
        </div>
        <CardContent className="grow p-6">
          <h4 className="mb-2 text-lg font-semibold">{course.name}</h4>
          <p className="text-muted-foreground mb-4 line-clamp-3 overflow-hidden text-sm">
            {course.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
