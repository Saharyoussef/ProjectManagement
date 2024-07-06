"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { Copy, Trash } from "lucide-react";
import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { useAction } from "@/hooks/use-action";
import { useParams } from "next/navigation";
import { useCardModal } from "@/hooks/use-card-modal";
import { toast } from "sonner";
import { useState } from "react";
import ConfirmDialog from "@/app/(platform)/(dashboard)/organization/[organizationId]/chat/contacts/_components/confirmDialog";

interface ActionsProps {
    data: CardWithList;
}

export const Actions = ({
    data,
}: ActionsProps) => {

    const params = useParams();
    const cardModal = useCardModal();
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const {
        execute: executeCopyCard,
        isLoading: isLoadingCopy,
    } = useAction(copyCard, {
        onSuccess: (data) => {
            toast.success(`Task "${data.title}" copied`);
            cardModal.onClose();
        },
        onError: (error) => {
            toast.error(error);
        },
    });

    const {
        execute: executeDeleteCard,
        isLoading: isLoadingDelete,
    } = useAction(deleteCard, {
        onSuccess: (data) => {
            toast.success(`Task "${data.title}" deleted`);
            cardModal.onClose();
        },
        onError: (error) => {
            toast.error(error);
        },
    });

    const onCopy = () => {
        const projectId = params.projectId as string;

        executeCopyCard({
            id: data.id,
            projectId,
        });
    };

    const onDelete = () => {
        setShowConfirmDialog(true);
    };

    const confirmDelete = () => {
        const projectId = params.projectId as string;

        executeDeleteCard({
            id: data.id,
            projectId,
        });
        setShowConfirmDialog(false);
    };

    const cancelDelete = () => {
        setShowConfirmDialog(false);
    };

    return (
        <>
            <div className="space-y-2 mt-2">
                <p className="text-xs font-semibold">
                    Actions
                </p>
                <Button
                    onClick={onCopy}
                    disabled={isLoadingCopy}
                    variant="gray"
                    className="w-full justify-start"
                    size="inline">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                </Button>

                <Button
                    onClick={onDelete}
                    disabled={isLoadingDelete}
                    variant="gray"
                    className="w-full justify-start"
                    size="inline">
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                </Button>
            </div>
            {showConfirmDialog && (
                <ConfirmDialog
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                    message="Are you sure you want to delete this task?"
                />
            )}
        </>
    );
};

Actions.Skeleton = function ActionSkeleton() {
    return (
        <div className="space-y-2 mt-2">
            <Skeleton className="w-20 h-4 bg-neutral-200" />
            <Skeleton className="w-full h-8 bg-neutral-200" />
            <Skeleton className="w-full h-8 bg-neutral-200" />
        </div>
    );
};
