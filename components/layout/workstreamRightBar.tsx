"use client";

import { useState } from "react";

export default function WorkStreamRightBar() {
  const [open, setOpen] = useState({
    rm: true,
    ms: false,
    doc: false,
    act: false,
    note: false,
  });

  const toggle = (key: keyof typeof open) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const boxStyle =
    "bg-white border border-gray-200 rounded-lg p-4 shadow-sm";

  return (
    <aside className="w-full px-4 py-4 space-y-4">
      
      {/* Relationship Manager */}
      <div className={boxStyle}>
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-700">Relationship Manager</h4>
          <button
            className="text-sm !text-green-600"
            onClick={() => toggle("rm")}
          >
            Toggle
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
            className="text-sm !text-green-600 "
            onClick={() => toggle("ms")}
          >
            Toggle
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
            className="text-sm !text-green-600"
            onClick={() => toggle("doc")}
          >
            Toggle
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
            className="text-sm !text-green-600"
            onClick={() => toggle("act")}
          >
            Toggle
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
            className="text-sm !text-green-600"
            onClick={() => toggle("note")}
          >
            Toggle
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
