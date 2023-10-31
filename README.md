### Installation:

Obs: You need to have Trivy installed on your machine

#### Vulnvisor install

- $ trivy plugin install vulnvisor_vx.x.x_.tar.gz

### Usage:

- $ trivy vulnvisor fs /path/to/target --list-all-pkgs --dependency-tree --html-result <output>.html
- $ trivy vulnvisor image image:version --dependency-tree --html-result <output>.html


#### Examples:

- $ trivy vulnvisor image nginx:latest --dependency-tree --html-result result.html
- $ trivy vulnvisor fs . --dependency-tree --html-result result2.html

