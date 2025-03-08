import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { z } from "zod";
import useDashboardStore from "@/store/useDashboardStore";
import LoadingSpinner from "../loaders/LoadingSpinner";
import { useToast } from "@/hooks/use-toast";

const illnessSchema = z.object({
    name: z.string().min(1, "Illness Name is required"),
    lastWeekCases: z.string().min(1, "Last Week Count is required").refine(val => !isNaN(Number(val)), { message: "Must be a number" }),
    currentWeekCases: z.string().min(1, "Current Week Count is required").refine(val => !isNaN(Number(val)), { message: "Must be a number" }),
});

function DashboardForm({ clicked, onClose }) {
    const { toast } = useToast();
    const { saveDashboard, getDashboard, dashboard } = useDashboardStore();
    const [illnesses, setIllnesses] = useState([]);
    const [defaultData, setDefaultData] = useState({});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [countError, setCountError] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const getData = async () =>{
            await getDashboard();
        }

        getData().finally(() => {
            if(dashboard){
                setTitle(dashboard?.title);
                setDescription(dashboard?.description);
                setIllnesses(dashboard?.illnesses);
                setDefaultData({ title: dashboard?.title, description: dashboard?.description, illnesses: dashboard?.illnesses });
            }
        });
    }, [clicked]);

    const addIllness = () => {
        setIllnesses([...illnesses, { name: "", lastWeekCases: "", currentWeekCases: "" }]);
    };

    const removeIllness = (index) => {
        setIllnesses(illnesses.filter((_, i) => i !== index));
    };

    const handleChange = (index, field, value) => {
        setIllnesses(illnesses.map((illness, i) =>
            i === index ? { ...illness, [field]: value } : illness
        ));
    };

    const handleSave = async () => {
        setErrors({});
        setTitleError('');
        setDescriptionError('');
        setCountError('');

        if (!title.length > 0) {
            setTitleError('Title is required')
            return;
        }
        if (!description.length > 0) {
            setDescriptionError('Description is required')
            return;
        }

        const validationErrors = {};
        let isValid = true;

        if(!illnesses.length > 0){
            setCountError('Add atleast one illnesses')
            return;
        }

        illnesses.forEach((illness, index) => {
            const result = illnessSchema.safeParse(illness);
            if (!result.success) {
                isValid = false;
                validationErrors[index] = result.error.format();
            }
        });

        if (!isValid) {
            setErrors(validationErrors);
            return;
        }

        if (JSON.stringify(defaultData) === JSON.stringify({ title: title.trim(), description: description.trim(), illnesses })) {
            toast({ title: "No Changes", description: 'No changes detect.' });
            return;
        }

        setIsLoading(true);
        const result = await saveDashboard(title.trim(), description.trim(), illnesses)
        if(result) {
            if(result?.success){
                toast({ title: "Success", description: result.success });
            } 

            if(result?.err){
                toast({ title: "Error", description: result.err });
            } 

            onClose();
        };
        setIsLoading(false);
        setErrors({});
        setTitleError('');
        setDescriptionError('');
        setCountError('');
    };

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Edit Dashboard</DialogTitle>
                <DialogDescription>
                    Make changes to dashboard data. Click save when you're done.
                </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <div>Dashboard Title</div>
                    <Input 
                        value={title}
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {titleError && <p className="text-red-500 text-sm">{titleError}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <div>Dashboard Description</div>
                    <Textarea 
                        value={description}
                        placeholder="Description"
                        className="max-h-[100px]"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {descriptionError && <p className="text-red-500 text-sm">{descriptionError}</p>}
                </div>
                {illnesses?.length > 0 && <div>Pet Illnesses</div>}
                <div className="flex flex-col gap-4 overflow-y-auto max-h-[50vh]">
                    {illnesses?.map((illness, index) => (
                        <div key={index} className="flex flex-col gap-2 bg-slate-100 dark:bg-slate-900 p-6 rounded-lg relative">
                            <button 
                                className="absolute top-2 right-4"
                                onClick={() => removeIllness(index)}
                            >
                                ✖
                            </button>
                            <div className="flex flex-col gap-1">
                                <div>Pet Illness</div>
                                <Input 
                                    value={illness.name}
                                    placeholder="Illness Name"
                                    onChange={(e) => handleChange(index, "name", e.target.value)}
                                />
                                {errors[index]?.name && <p className="text-red-500 text-sm">{errors[index].name._errors[0]}</p>}
                            </div>
                            <div className="flex flex-col gap-1">
                                <div>Last Week Cases</div>
                                <Input 
                                    type="number"
                                    placeholder="Number of cases"
                                    value={illness.lastWeekCases}
                                    onChange={(e) => handleChange(index, "lastWeekCases", e.target.value)}
                                />
                                {errors[index]?.lastWeekCases && <p className="text-red-500 text-sm">{errors[index].lastWeekCases._errors[0]}</p>}
                            </div>
                            <div className="flex flex-col gap-1">
                                <div>Current Week Cases</div>
                                <Input 
                                    type="number"
                                    placeholder="Number of cases"
                                    value={illness.currentWeekCases}
                                    onChange={(e) => handleChange(index, "currentWeekCases", e.target.value)}
                                />
                                {errors[index]?.currentWeekCases && <p className="text-red-500 text-sm">{errors[index].currentWeekCases._errors[0]}</p>}
                            </div>
                        </div>
                    ))}
                    <Button onClick={addIllness} className="mt-2">+ Add Pet Illness</Button>
                    {countError && <p className="text-red-500 text-sm">{countError}</p>}
                </div>
            </div>
            <DialogFooter>
                <Button type="submit" disabled={isLoading} onClick={handleSave}>Save changes <LoadingSpinner isLoading={isLoading} cls="ml-2 mr-0"/></Button>
            </DialogFooter>
        </DialogContent>
    )
}

export default DashboardForm;