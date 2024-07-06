import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
    onConfirm: () => void;
    onCancel: () => void;
    message: string;
};

const ConfirmDialog = ({ onConfirm, onCancel, message }: Props) => {
    return (
        <Dialog open={true} onOpenChange={onCancel}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirmation</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="destructive" onClick={onConfirm}>Yes</Button>
                    <Button variant="secondary" onClick={onCancel}>No</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmDialog;
