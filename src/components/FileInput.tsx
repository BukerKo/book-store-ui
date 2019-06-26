import * as React from "react";
import {createRef} from "react";

interface IProps {
    handleFileChoose: Function
}

interface IState {

}

export default class FileInput extends React.Component<IProps, IState> {
    private labelRef = createRef<HTMLLabelElement>();

    onFileChosen = (event: any) => {
        let target = event.target;
        if (target.files) {
            const label = this.labelRef.current;
            if (label) {
                label.innerText = target.files.item(0).name;
            }
            this.props.handleFileChoose(target.files.item(0));
        }
    };

    render() {
        return (

            <div className="custom-file">
                <input
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                    onChange={this.onFileChosen}
                    accept='image/*'
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01" ref={this.labelRef}>
                    Choose file
                </label>
            </div>

        );
    }
}

