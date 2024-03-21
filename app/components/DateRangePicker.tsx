"use client";

import * as React from "react";
import {addDays, format} from "date-fns";
import {Calendar as CalendarIcon} from "lucide-react";
import {DateRange} from "react-day-picker";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useEffect} from "react";

export default function DatePickerWithRange({
	className,
	from,
	to,
}: {
	className?: React.HTMLAttributes<HTMLDivElement>;
	from: Date;
	to: Date;
}) {
	const [date, setDate] = React.useState<DateRange | undefined>({from, to});

	// Persistent date state
	useEffect(() => {
		const date = window.localStorage.getItem("date");
		try {
			if (date !== null && date !== undefined) setDate(JSON.parse(date));
		} catch (error) {
			console.log(error);
		}
	}, []);
	useEffect(() => {
		window.localStorage.setItem("date", JSON.stringify(date));
	}, [date]);
	const updateParams = (newDate: DateRange) => {
		window.localStorage.setItem("date", JSON.stringify(newDate));
		let searchParams = new URLSearchParams(window.location.search);
		try {
			searchParams.set(
				"from",
				newDate.from?.toString() ? newDate.from.toString() : ""
			);
			searchParams.set("to", newDate.to?.toString() ? newDate.to.toString() : "");
		} catch (error) {
			console.log(error);
		}
		window.location.search = searchParams.toString();
	};

	return (
		<div className={cn("grid gap-2", className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={"outline"}
						className={cn(
							"w-[300px] justify-start text-left font-normal",
							!date && "text-muted-foreground"
						)}>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, "LLL dd, y")} -{" "}
									{format(date.to, "LLL dd, y")}
								</>
							) : (
								format(date.from, "LLL dd, y")
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className="w-auto p-0"
					align="start">
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={date?.from}
						selected={date}
						onSelect={newDate => updateParams(newDate as DateRange)}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
