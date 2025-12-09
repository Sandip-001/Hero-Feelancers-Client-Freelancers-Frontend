"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function WorkStreamRightBar() {
  const [open, setOpen] = useState({
    rm: true,
    ms: false,
    doc: false,
    act: false,
    note: false,
  });
  

  const boxStyle = "bg-white border border-gray-200 rounded-lg p-4 shadow-sm";

  return (
    <aside className="w-full px-4 py-4 space-y-4">

    {/* ---------------------- PROGRESS BAR AREA ---------------------- */}
           {/* --------- FOOTER BOXES --------- */}
      <div className="grid grid-rows-2 gap-2 bg-[#fafafa] border-t">
        
        {/* Project Progress */}
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <p className="text-sm font-medium text-gray-700 mb-2">Project Progress - 60%</p>

          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-2 bg-green-600 w-[65%]"></div>
          </div>
        </div>

        {/* Next milestone */}
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <p className="text-sm font-medium text-gray-700">Next milestone</p>
          <p className="font-semibold text-gray-900 mt-1">
            Backend APIs • ₹25,000
          </p>
          <p className="text-xs text-gray-500">Due: 20 Nov</p>
        </div>

      </div>


      {/* Relationship Manager */}
      <div className={boxStyle}>
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-700">Relationship Manager</h4>
          <button
            onClick={() =>
              setOpen({
                ...open,
                rm: !open.rm, 
              })
            }
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${
                open.rm ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>

        {open.rm && (
          <div className="mt-3">
            <div className="flex items-center gap-3">
              <img
                src="https://randomuser.me/api/portraits/men/65.jpg"
                className="w-11 h-11 rounded-full"
              />
              <div>
                <div className="font-medium">Priya Sharma</div>
                <div className="text-xs text-gray-500">RM • priya@fhub.com</div>
                <div className="text-xs text-green-500">Online • 2h left</div>
              </div>
            </div>

            <div className="mt-3 grid gap-2">
              <button className="px-3 py-2 border rounded text-sm hover:bg-gray-50">
                Message RM
              </button>
              <button className="px-3 py-2 border rounded text-sm hover:bg-gray-50">
                Schedule Call
              </button>
              <button className="px-3 py-2 border rounded text-sm hover:bg-gray-50">
                Escalate Issue
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Project Milestones */}
      <div className={boxStyle}>
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-700">Project Milestones</h4>
          <button
            onClick={() =>
              setOpen({
                ...open,
                ms: !open.ms, // Change key according to section: rm, ms, docs, etc.
              })
            }
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${
                open.ms ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>

        {open.ms && (
          <div className="mt-3 text-sm">
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-gray-500">
                <tr>
                  <th>Milestone</th>
                  <th className="text-right">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t">
                  <td className="py-2">UI/UX - Homepage</td>
                  <td className="py-2 text-right text-green-600">
                    Completed • ₹20,000
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="py-2">Backend APIs</td>
                  <td className="py-2 text-right text-yellow-600">
                    In Progress • ₹25,000
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="py-2">QA & Handover</td>
                  <td className="py-2 text-right text-gray-500">
                    Pending • ₹10,000
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mt-3 text-xs text-gray-500">
              Total: ₹55,000 • Paid: ₹20,000
            </div>

            <div className="mt-3 grid gap-2">
              <button className="px-3 py-2 border rounded text-sm hover:bg-gray-50">
                Add Milestone
              </button>
              <button className="px-3 py-2 border rounded text-sm hover:bg-gray-50">
                Release Payment
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Project Documents */}
      <div className={boxStyle}>
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-700">Project Documents</h4>
          <button
            onClick={() =>
              setOpen({
                ...open,
                doc: !open.doc, // Change key according to section: rm, ms, docs, etc.
              })
            }
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${
                open.doc ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>

        {open.doc && (
          <div className="mt-3 text-sm">
            <div className="space-y-2">
              <div className="p-3 border rounded hover:bg-gray-50">
                <div className="font-medium">Contract_v1.pdf</div>
                <div className="text-xs text-gray-500">
                  Signed • 2025-08-10 •{" "}
                  <button className="text-blue-600 hover:underline">
                    Download
                  </button>
                </div>
              </div>

              <div className="p-3 border rounded hover:bg-gray-50">
                <div className="font-medium">Design_Screens_v3.zip</div>
                <div className="text-xs text-gray-500">
                  Uploaded • 2025-09-05 •{" "}
                  <button className="text-blue-600 hover:underline">
                    Preview
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <button className="px-3 py-2 border rounded text-sm hover:bg-gray-50">
                Upload Document
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Activity Timeline */}
      <div className={boxStyle}>
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-700">Activity Timeline</h4>
          <button
            onClick={() =>
              setOpen({
                ...open,
                act: !open.act, // Change key according to section: rm, ms, docs, etc.
              })
            }
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${
                open.act ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>

        {open.act && (
          <div className="mt-3 text-sm">
            <ol className="border-l-2 border-gray-200 pl-4 space-y-3">
              <li>
                <div className="text-xs text-gray-500">Aug 9</div>
                <div className="font-medium">Proposal submitted</div>
              </li>
              <li>
                <div className="text-xs text-gray-500">Aug 10</div>
                <div className="font-medium">Contract offered</div>
              </li>
              <li>
                <div className="text-xs text-gray-500">Aug 12</div>
                <div className="font-medium">Milestone 1 paid</div>
              </li>
            </ol>
          </div>
        )}
      </div>

      {/* Internal Notes */}
      <div className={boxStyle}>
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-700">Internal Notes</h4>
          <button
            onClick={() =>
              setOpen({
                ...open,
                note: !open.note, // Change key according to section: rm, ms, docs, etc.
              })
            }
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${
                open.note ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>

        {open.note && (
          <div className="mt-3 text-sm">
            <textarea
              className="w-full border rounded p-2 text-sm"
              placeholder="Write a private note…"
            ></textarea>

            <div className="mt-2 flex gap-2">
              <button className="px-3 py-1 border rounded text-sm hover:bg-gray-50">
                Save
              </button>
              <button className="px-3 py-1 border rounded text-sm hover:bg-gray-50">
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
