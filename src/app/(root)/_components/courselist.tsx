import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getCourses } from "@/server/api/scripts";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import React from "react";

export async function CourseList() {
  const data = await getCourses();

  if (!data || data.length === 0) {
    return <div>No courses found</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((course) => (
        <Link href={`/course/${course.id}`} key={course.id}>
          <div>
            <Card className="overflow-hidden">
              <div className="flex aspect-video items-center justify-center bg-muted">
                <BookOpen className="h-10 w-10 text-muted-foreground" />
              </div>
              <CardContent className="p-6">
                <h4 className="mb-2 text-lg font-semibold">{course.name}</h4>
                <p className="mb-4 text-sm text-muted-foreground">
                  {course.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function CourseListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="col-span-1 flex flex-col gap-4">
          <Card className="overflow-hidden">
            <div className="flex aspect-video items-center justify-center bg-muted">
              <BookOpen className="h-10 w-10 text-muted-foreground" />
            </div>
            <CardContent className="p-6">
              <div className="mb-2 h-4 w-60 bg-muted" />
              <div className="mb-2 h-4 w-40 bg-muted" />
            </CardContent>
          </Card>
        </Skeleton>
      ))}
    </div>
  );
}