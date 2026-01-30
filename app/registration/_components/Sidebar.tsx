import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, Sparkles } from "lucide-react";
import React from "react";

const Sidebar = () => {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-amber-200 bg-gradient-to-br from-yellow-50 to-amber-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-400 flex items-center justify-center">
              <Shield className="text-white" size={24} />
            </div>
            <h3 className="font-bold text-lg">Secure & Protected</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Your data is encrypted and protected with industry-standard security
            measures.
          </p>
        </CardContent>
      </Card>

      <Card className="border-2 border-amber-200 bg-gradient-to-br from-yellow-50 to-amber-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-400 flex items-center justify-center">
              <Sparkles className="text-white" size={24} />
            </div>
            <h3 className="font-bold text-lg">Why Choose Us?</h3>
          </div>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <CheckCircle
                className="text-green-500 flex-shrink-0 mt-0.5"
                size={16}
              />
              <span>Instant project matching with AI</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle
                className="text-green-500 flex-shrink-0 mt-0.5"
                size={16}
              />
              <span>24/7 customer support</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle
                className="text-green-500 flex-shrink-0 mt-0.5"
                size={16}
              />
              <span>Secure payment gateway</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle
                className="text-green-500 flex-shrink-0 mt-0.5"
                size={16}
              />
              <span>Verified freelancers & clients</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sidebar;
