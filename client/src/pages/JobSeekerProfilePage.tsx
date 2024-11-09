import { useState, useEffect } from "react";
import {
  useGetJobSeekerByIdQuery,
  useUpdateJobSeekerByIdMutation,
} from "@/redux/api/jobseekerSlice";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { JobSeeker } from "@/misc/jobseekers";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobSeekerProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetJobSeekerByIdQuery(id!);
  const [updateJobSeeker, { isLoading: isUpdating }] =
    useUpdateJobSeekerByIdMutation();
  const [isEditing, setIsEditing] = useState(false);

  const [editableFields, setEditableFields] = useState<Partial<JobSeeker>>({
    name: "",
    email: "",
    position: "",
    experience: "",
    skills: [],
    wellBeingPreferences: [],
    jobSeekerProfile_summary: "",
  });

  useEffect(() => {
    if (data) {
      setEditableFields(data);
    }
  }, [data]);

  const handleChange = (field: keyof JobSeeker, value: string | string[]) => {
    setEditableFields((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateJobSeeker({ id: id!, data: editableFields }).unwrap();
      toast.success("Profile updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Error updating profile. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center mt-10 text-red-500">
        Error loading profile
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-20">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Job Seeker Profile
        </h1>
        {editableFields && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              {isEditing ? (
                <Input
                  type="text"
                  value={editableFields.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full"
                />
              ) : (
                <p className="text-gray-700">{editableFields.name}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              {isEditing ? (
                <Input
                  type="email"
                  value={editableFields.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full"
                />
              ) : (
                <p className="text-gray-700">{editableFields.email}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Position
              </label>
              {isEditing ? (
                <Input
                  type="text"
                  value={editableFields.position || ""}
                  onChange={(e) => handleChange("position", e.target.value)}
                  className="w-full"
                />
              ) : (
                <p className="text-gray-700">{editableFields.position}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Experience (years)
              </label>
              {isEditing ? (
                <Input
                  type="text"
                  value={editableFields.experience || ""}
                  onChange={(e) => handleChange("experience", e.target.value)}
                  className="w-full"
                />
              ) : (
                <p className="text-gray-700">{editableFields.experience}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Skills
              </label>
              {isEditing ? (
                <Input
                  type="text"
                  value={editableFields.skills?.join(", ") || ""}
                  onChange={(e) =>
                    handleChange(
                      "skills",
                      e.target.value.split(",").map((s) => s.trim())
                    )
                  }
                  className="w-full"
                />
              ) : (
                <p className="text-gray-700">
                  {editableFields.skills?.join(", ")}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Well-being Preferences
              </label>
              {isEditing ? (
                <Input
                  type="text"
                  value={editableFields.wellBeingPreferences?.join(", ") || ""}
                  onChange={(e) =>
                    handleChange(
                      "wellBeingPreferences",
                      e.target.value.split(",").map((p) => p.trim())
                    )
                  }
                  className="w-full"
                />
              ) : (
                <p className="text-gray-700">
                  {editableFields.wellBeingPreferences?.join(", ")}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Profile Summary
              </label>
              {isEditing ? (
                <textarea
                  value={editableFields.jobSeekerProfile_summary || ""}
                  onChange={(e) =>
                    handleChange("jobSeekerProfile_summary", e.target.value)
                  }
                  className="w-full border rounded p-2"
                />
              ) : (
                <p className="text-gray-700">
                  {editableFields.jobSeekerProfile_summary}
                </p>
              )}
            </div>

            {/* Matching List Section */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Matching Companies</h2>
              {editableFields.matchingList &&
              editableFields.matchingList.length > 0 ? (
                <ul className="list-disc list-inside space-y-1">
                  {editableFields.matchingList.map((match, index) => (
                    <li key={index}>
                      <span className="font-medium">Company ID:</span>{" "}
                      {match.companyId},{" "}
                      <span className="font-medium">Score:</span> {match.score}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">
                  Don't stress, your ideal company will be found soon!
                </p>
              )}
            </div>

            {isEditing ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleUpdate}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Save Changes"}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Edit Profile
                </Button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSeekerProfilePage;
