import JobDetails from "./job-details"

export default async function page({
  params,
}: {
  params: Promise<{ job_id: string }>
}) {
  await params

  return <JobDetails />
}
