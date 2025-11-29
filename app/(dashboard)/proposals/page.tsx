import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DollarSign, Calendar, Eye, Star } from "lucide-react"

const proposalData = {
  title: "UI design for mobile",
  budget: "$1000",
  proposals: 74,
  views: 74,
  status: "Pending",
  description:
    "I will design UI UX for mobile app with figma for ios Adarsh Group is venturing into homes Inspired by the millennial generation- Adarsh Greens, offering new Lifestyle, with the same Trust, Quality & Consistency.....",
  link: "www.Figma.it",
  skills: ["Web Scraping", "Website Design", "PHP", "WordPress"],
}

const proposals = [
  {
    id: 1,
    name: "Kuldeep Misariya",
    rating: 4.5,
    hoursAgo: 3,
    experience: "As an Assistant professor at Poornima Ins.GSS+. Project Received: 09, 05, Ticket.",
    education: "My education from xxx iiiure University intermediat, 26% Received: 05, 04, Ticket",
    hourlyRate: "$10.00/hr",
    earnedAmount: "$120 earned",
  },
  {
    id: 2,
    name: "Abdul Ghaffar",
    rating: 0,
    hoursAgo: 0,
    experience: "Freelance BOC at India where current work &&&. Received: 09, 05, Ticket",
    education: "My education from xxx iiiure University intermediat, 26% Received: 05, 04, Ticket",
    hourlyRate: "$10.00/hr",
    earnedAmount: "$0 earned",
  },
]

export default function ProposalsPage() {
  return (
    <div className="p-8 max-w-7xl pt-12 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Project Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Project Info */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">{proposalData.title}</CardTitle>
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {proposalData.budget}
                      <span className="ml-2">Budget</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold mr-1">{proposalData.proposals}</span>
                      Proposals
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {proposalData.views} Views
                    </div>
                  </div>
                </div>
                <Badge variant="pending">{proposalData.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-sm text-gray-600">{proposalData.description}</p>
                <a href={proposalData.link} className="text-sm text-primary mt-2 inline-block">
                  {proposalData.link}
                </a>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Skills Required</h3>
                <div className="flex flex-wrap gap-2">
                  {proposalData.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* New Proposal Form */}
          <Card>
            <CardHeader>
              <CardTitle>New Proposal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="details">Proposal Details</Label>
                <Textarea
                  id="details"
                  placeholder="Enter proposal details..."
                  className="min-h-[120px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bid">Bid</Label>
                  <Input id="bid" placeholder="(No)" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="request">Digital Request</Label>
                  <Input id="request" placeholder="(No)" />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Project in which are will Work All project
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <input type="checkbox" id="featured" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="featured" className="text-yellow-600 font-semibold">
                      Featured
                    </Label>
                    <p className="text-xs text-gray-500 mt-1">
                      ONLY ONE. $48 is featured out of Top 4 Proposals & Shortlist in 96 More
                      others to be awarded: In the first time. The proposed indicators.
                    </p>
                    <p className="text-sm font-semibold mt-2">260 INR</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <input type="checkbox" id="daily" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="daily" className="text-blue-600 font-semibold">
                      Daily
                    </Label>
                    <p className="text-xs text-gray-500 mt-1">
                      Highlight your proposal to stand out from others and get more attention.
                    </p>
                    <p className="text-sm font-semibold mt-2">50 INR</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <input type="checkbox" id="verify" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="verify">
                      Verify me if this job is awarded to overcome xltra.
                    </Label>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button className="flex-1">Send Proposal</Button>
              </div>
            </CardContent>
          </Card>

          {/* Proposals List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Proposal</h2>
              <Button variant="ghost">▼</Button>
            </div>

            {proposals.map((proposal) => (
              <Card key={proposal.id} className="mb-4">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback>{proposal.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{proposal.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            {proposal.rating > 0 && (
                              <div className="flex items-center text-yellow-500">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="text-sm ml-1">{proposal.rating}</span>
                              </div>
                            )}
                            {proposal.hoursAgo > 0 && (
                              <span className="text-sm text-gray-500">
                                · {proposal.hoursAgo} hours ago
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          <span className="font-medium">Experience:</span> {proposal.experience}
                        </p>
                        <p>
                          <span className="font-medium">Education:</span> {proposal.education}
                        </p>
                      </div>

                      <div className="flex items-center space-x-4 mt-3 text-sm">
                        <span className="font-semibold">{proposal.hourlyRate}</span>
                        <span className="text-gray-500">{proposal.earnedAmount}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About Client</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Location</span>
                <span className="font-medium">India</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Last Seen</span>
                <span className="font-medium">Feb 11, 2021 | 11:42 AM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Local Time</span>
                <span className="font-medium">INR 300</span>
              </div>
              <Button className="w-full" variant="outline">
                View manager profile
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <span className="text-gray-600">Category</span>
                <p className="font-medium">Web Development</p>
              </div>
              <div>
                <span className="text-gray-600">Project Type</span>
                <p className="font-medium">Fixed Price</p>
              </div>
              <div>
                <span className="text-gray-600">Budget</span>
                <p className="font-medium text-lg">{proposalData.budget}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
